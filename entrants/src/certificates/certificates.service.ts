import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CertificatesRepository } from './certificates.repository';
import { EntrantsRepository } from 'src/entrants/entrants.repository';
import { CertificateResultDto } from './dto/certificate-result.dto';

@Injectable()
export class CertificatesService {
  constructor(
    private certificatesRepo: CertificatesRepository,
    private entrantsRepo: EntrantsRepository,
  ) {}

  async getCertificatesByEntrartId(entrantId: string) {
    const certificates = await this.certificatesRepo.query(
      `SELECT id, "certificateType", grade FROM certificate WHERE "entrantId" = '${entrantId}'`,
    );

    return certificates;
  }

  async create(
    createCertificateDto: any,
    file: any,
    enrolleeId: string,
  ): Promise<CertificateResultDto> {
    const entrant = await this.entrantsRepo.findOne({
      where: { id: enrolleeId },
    });
    if (!entrant) {
      throw new NotFoundException(`Entrant with ID ${enrolleeId} not found.`);
    }

    const certificate = this.certificatesRepo.create({
      certificateType: createCertificateDto.certificateType,
      grade: createCertificateDto.grade,
      entrant,
      filename: file.originalname,
      data: file.buffer,
    });

    await this.certificatesRepo.save(certificate);

    return {
      id: certificate.id,
      certificateType: certificate.certificateType,
      grade: certificate.grade,
    };
  }

  async getCertificateFile(certId) {
    const certificate = await this.certificatesRepo.findOne({
      where: { id: certId },
    });

    return certificate;
  }

  async findOneByIdAndEntrantId(id: string, enrolleeId: string) {
    const certificate = await this.certificatesRepo.findOne({ where: { id } });

    if (!certificate) {
      throw new NotFoundException(`Certificate with ID ${id} not found.`);
    }
    if (certificate.entrant.id !== enrolleeId) {
      throw new ForbiddenException();
    }

    return certificate;
  }

  async findByEntrantId(entrantId: string): Promise<CertificateResultDto[]> {
    const certificates = await this.certificatesRepo.query(
      `SELECT id, "certificateType", grade FROM certificate WHERE "entrantId" = '${entrantId}'`,
    );

    return certificates;
  }

  async remove(id: string, enrolleeId: string) {
    const result = await this.certificatesRepo.delete({
      id,
      entrant: await this.entrantsRepo.findOne({
        where: { id: enrolleeId },
      }),
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Certificate with ID "${id}" not found`);
    }

    return { message: `Certificate ${id} was succesfully deleted` };
  }

  async change(updateCertificateDto, file, enrolleeId, certificateId) {
    // Find the entrant by ID
    const entrant = await this.entrantsRepo.findOne({
      where: { id: enrolleeId },
      relations: ['certificates'],
    });

    if (!entrant) {
      // Handle case when entrant is not found
      return null;
    }

    // Find the certificate by ID within the entrant's certificates
    const certificate = entrant.certificates.find(
      (cert) => cert.id === certificateId,
    );

    if (!certificate) {
      // Handle case when certificate is not found
      return null;
    }

    const { certificateType, grade } = updateCertificateDto;

    // Update certificate properties based on updateCertificateDto
    if (file.originalname) certificate.filename = file.originalname;
    if (file.buffer) certificate.data = file.buffer;

    if (certificateType) certificate.certificateType = certificateType;
    if (grade) certificate.grade = grade;

    // Save the changes to the database
    await this.certificatesRepo.save(certificate);

    // Optionally, you can return the updated certificate

    return {
      id: certificate.id,
      certificateType: certificate.certificateType,
      grade: certificate.grade,
    };
  }

  async getAll() {
    const certificates = await this.certificatesRepo.query(
      `SELECT 
          c.id AS certificate_id,
          c."certificateType",
          c.grade,
          e."firstName" || ' ' || e."lastName" AS fullName
      FROM 
          certificate c
      JOIN 
          entrant e ON c."entrantId" = e.id;
      `,
    );

    return certificates;
  }
}

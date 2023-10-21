import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CertificatesRepository } from './certificates.repository';
import { EntrantsRepository } from 'src/entrants/entrants.repository';

@Injectable()
export class CertificatesService {
  constructor(
    private certificatesRepo: CertificatesRepository,
    private entrantsService: EntrantsRepository,
  ) {}

  async create(createCertificateDto: any, file: any, enrolleeId: string) {
    const entrant = await this.entrantsService.findOne({
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

    return 'This action adds a new certificate';
  }

  async findOneByEntrantId(id: string, enrolleeId: string) {
    const certificate = await this.certificatesRepo.findOne({ where: { id } });

    if (!certificate) {
      throw new NotFoundException(`Certificate with ID ${id} not found.`);
    }
    if (certificate.entrant.id !== enrolleeId) {
      throw new ForbiddenException();
    }

    return certificate;
  }

  async remove(id: string, enrolleeId: string) {
    const result = await this.certificatesRepo.delete({
      id,
      entrant: await this.entrantsService.findOne({
        where: { id: enrolleeId },
      }),
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Certificate with ID "${id}" not found`);
    }

    return { message: 'Certificate was succesfully deleted' };
  }
}

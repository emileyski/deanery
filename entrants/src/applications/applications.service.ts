import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { SpecialtyRepository } from 'src/specialties/repositories/speciality.repository';
import { EntrantsRepository } from 'src/entrants/entrants.repository';
import { ApplicationRepository } from './applications.repository';

@Injectable()
export class ApplicationsService {
  constructor(
    private readonly specialtyRepository: SpecialtyRepository,
    private readonly entrantsRepository: EntrantsRepository,
    private readonly apllicationRepository: ApplicationRepository,
  ) {}

  async createApplication(createApplicationDto: CreateApplicationDto, user) {
    const entrant = await this.entrantsRepository.findOne({
      where: { id: user.id },
      relations: ['certificates'],
    });

    if (!entrant) {
      throw new NotFoundException();
    }

    const specialty = await this.specialtyRepository.findOne({
      where: { id: createApplicationDto.specialtyId },
      relations: ['coefficients'],
    });

    if (!specialty) {
      throw new NotFoundException();
    }

    const requiredCoefficients = specialty.coefficients;

    const entrantCertificates = entrant.certificates;

    let competitiveScore = 0;

    for (const requiredCoefficient of requiredCoefficients) {
      const matchingCertificate = entrantCertificates.find(
        (certificate) =>
          certificate.certificateType === requiredCoefficient.certificateType,
      );

      if (!matchingCertificate) {
        throw new BadRequestException(
          `Необходим сертификат с типом ${requiredCoefficient.certificateType} для подачи заявки на специальность`,
        );
      }

      // Подсчет конкурсного бала
      competitiveScore +=
        matchingCertificate.grade * requiredCoefficient.coefficient;
    }

    // Создание и сохранение заявки
    const application = this.apllicationRepository.create({
      entrant,
      specialty,
      competitiveScore,
    });

    await this.apllicationRepository.save(application);

    // Вернуть созданную заявку или её id, если необходимо
    return {
      specialty: application.specialty,
      competitiveScore,
    };
  }

  async getAvailableApplications() {
    const applications = await this.apllicationRepository
      .createQueryBuilder('application')
      .select([
        'entrant.id',
        'application.competitiveScore',
        'entrant.firstName',
        'entrant.lastName',
      ])
      .innerJoin('application.entrant', 'entrant')
      .where('application.status = :status', { status: 'pending' })
      .getRawMany();

    return applications;
  }

  async applyApplication(applicationId: string) {
    const application = await this.apllicationRepository.findOne({
      where: { id: applicationId },
    });

    application.status = 'accepted';
  }
}

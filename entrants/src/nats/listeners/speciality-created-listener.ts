import {
  Listener,
  SpecialtyCreatedEvent,
  Subjects,
} from '@deanery-common/shared';
import { Injectable } from '@nestjs/common';
import { SpecialtyRepository } from 'src/specialties/repositories/speciality.repository';
import { queueGroupName } from '../queueGroupName';
import { Message } from 'node-nats-streaming';
import { CoefficientRepository } from 'src/specialties/repositories/coefficient.repository';

@Injectable()
export class SpecialtyCreatedListener extends Listener<SpecialtyCreatedEvent> {
  constructor(
    private specialtyRepository: SpecialtyRepository,
    private coefficientRepository: CoefficientRepository,
  ) {
    super(null);
  }

  readonly subject: Subjects.SpecialtyCreated = Subjects.SpecialtyCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: SpecialtyCreatedEvent['data'], msg: Message) {
    const specialty = this.specialtyRepository.create({
      id: data.id,
      availableForRecruitment: true,
      code: data.code,
      name: data.specialityName,
      faculty: data.faculty,
    });

    await this.specialtyRepository.save(specialty);

    // console.log(data);

    const coefficients = data.coeficients.map((coeffData) => {
      const coefficient = this.coefficientRepository.create({
        certificateType: coeffData.certificateType,
        coefficient: coeffData.coefficient, // Добавляем значение coefficient
      });
      coefficient.specialty = specialty;

      return coefficient;
    });

    await this.coefficientRepository.save(coefficients);
    msg.ack();
  }

  setClient(client) {
    this.client = client;
  }
}

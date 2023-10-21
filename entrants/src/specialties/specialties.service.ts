import { Injectable } from '@nestjs/common';
import { SpecialtyRepository } from './repositories/speciality.repository';

@Injectable()
export class SpecialtiesService {
  constructor(private specialtyRepository: SpecialtyRepository) {}

  async getSpecialtiesWithCoefficients() {
    const specialties = await this.specialtyRepository.find({
      relations: ['coefficients'],
    });
    return specialties;
  }
}

import { Module } from '@nestjs/common';
import { SpecialtyRepository } from './repositories/speciality.repository';
import { CoefficientRepository } from './repositories/coefficient.repository';
import { SpecialtiesController } from './specialties.controller';
import { SpecialtiesService } from './specialties.service';

@Module({
  providers: [SpecialtyRepository, CoefficientRepository, SpecialtiesService],
  controllers: [SpecialtiesController],
  exports: [SpecialtyRepository, CoefficientRepository],
})
export class SpecialtiesModule {}

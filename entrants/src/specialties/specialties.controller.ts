import { Controller, Get } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { GetUser } from 'src/user/user.decorator';

@Controller('specialties')
export class SpecialtiesController {
  constructor(private specialtiesService: SpecialtiesService) {}

  @Get()
  getAllSpecialties(@GetUser() user: any) {
    // console.log(user);
    return this.specialtiesService.getSpecialtiesWithCoefficients();
  }
}

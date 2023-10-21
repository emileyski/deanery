import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { SpecialtiesModule } from 'src/specialties/specialties.module';
import { EntrantsModule } from 'src/entrants/entrants.module';
import { ApplicationRepository } from './applications.repository';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  imports: [SpecialtiesModule, EntrantsModule, NatsModule],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, ApplicationRepository],
})
export class ApplicationsModule {}

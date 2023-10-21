import { Module } from '@nestjs/common';
import { NatsService } from './nats.service';
import { AccountCreatedListener } from './listeners/account-created-listener';
import { EntrantsModule } from 'src/entrants/entrants.module';
import { SpecialtiesModule } from 'src/specialties/specialties.module';
import { SpecialtyCreatedListener } from './listeners/speciality-created-listener';

@Module({
  imports: [EntrantsModule, SpecialtiesModule],
  providers: [NatsService, AccountCreatedListener, SpecialtyCreatedListener],
})
export class NatsModule {}

import { Module } from '@nestjs/common';
import { NatsService } from './nats.service';
import { AccountCreatedListener } from './listeners/account-created-listener';
import { EntrantsModule } from 'src/entrants/entrants.module';

@Module({
  imports: [EntrantsModule],
  providers: [NatsService, AccountCreatedListener],
})
export class NatsModule {}

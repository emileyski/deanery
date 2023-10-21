import { Module } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { CertificatesRepository } from './certificates.repository';
import { EntrantsModule } from 'src/entrants/entrants.module';

@Module({
  imports: [EntrantsModule],
  controllers: [CertificatesController],
  providers: [CertificatesService, CertificatesRepository],
})
export class CertificatesModule {}

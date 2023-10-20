import { Module } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { CertificatesRepository } from './certificates.repository';

@Module({
  controllers: [CertificatesController],
  providers: [CertificatesService, CertificatesRepository],
})
export class CertificatesModule {}

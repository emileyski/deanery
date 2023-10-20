import { CertificateType } from '@deanery-common/shared/build/entrants/certificate-types';
import { IsNumber, IsString, IsEnum } from 'class-validator';

export class CreateCertificateDto {
  @IsEnum(CertificateType)
  certificateType: CertificateType;

  @IsNumber()
  grade: number;
}

import { CertificateType } from '@deanery-common/shared';

export class CertificateResultDto {
  id: string;
  certificateType: CertificateType;
  grade: number;
  filename?: string;
  data?: Buffer;
}

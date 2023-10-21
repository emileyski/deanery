import { CertificateType } from '@deanery-common/shared';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Specialty } from './speciality.entity';

@Entity()
export class Coefficient {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'enum',
    enum: CertificateType,
    default: CertificateType.SchoolSertificate,
  })
  certificateType: CertificateType;

  @Column({ type: 'double precision' })
  coefficient: number;

  @ManyToOne(() => Specialty, (specialty) => specialty.coefficients)
  specialty: Specialty;
}

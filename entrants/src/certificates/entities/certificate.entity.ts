import { Entrant } from 'src/entrants/entities/entrant.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CertificateType } from '@deanery-common/shared/build/entrants/certificate-types';

@Entity()
export class Certificate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Entrant, (entrant) => entrant.certificates)
  @JoinColumn({ name: 'entrantId', referencedColumnName: 'id' })
  entrant: Entrant;

  @Column()
  filename: string;

  @Column({ type: 'bytea', nullable: true })
  data: Buffer;

  @Column({
    type: 'enum',
    enum: CertificateType,
    default: CertificateType.SchoolSertificate,
  })
  certificateType: CertificateType;

  @Column()
  grade: number;
}

import { Certificate } from 'src/certificates/entities/certificate.entity';
import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';

@Entity()
export class Entrant {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Certificate, (certificate) => certificate.entrant)
  certificates: Certificate[];
}

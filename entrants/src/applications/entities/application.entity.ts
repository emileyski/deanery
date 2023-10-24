import { Entrant } from 'src/entrants/entities/entrant.entity';
import { Specialty } from 'src/specialties/entities/speciality.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Specialty, (specialty) => specialty.applications)
  specialty: Specialty;

  @ManyToOne(() => Entrant, (entrant) => entrant.applications)
  entrant: Entrant;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  applicationDate: Date;

  @Column({ default: 'pending' })
  status: string;

  @Column({ type: 'double precision' })
  competitiveScore: number;
}

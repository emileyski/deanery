import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Coefficient } from './coefficient.entity';
import { Application } from 'src/applications/entities/application.entity';

@Entity()
export class Specialty {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column()
  name: string;

  @Column()
  faculty: string;

  @Column()
  code: string;

  @Column({ default: true })
  availableForRecruitment: boolean;

  @OneToMany(() => Coefficient, (coefficient) => coefficient.specialty, {
    cascade: true,
  })
  coefficients: Coefficient[];

  @OneToMany(() => Application, (application) => application.specialty) // Добавлено новое отношение
  applications: Application[]; // Добавлено новое поле
}

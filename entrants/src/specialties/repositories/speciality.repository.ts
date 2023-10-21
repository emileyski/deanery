import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Specialty } from '../entities/speciality.entity';

@Injectable()
export class SpecialtyRepository extends Repository<Specialty> {
  constructor(private dataSource: DataSource) {
    super(Specialty, dataSource.createEntityManager());
  }
}

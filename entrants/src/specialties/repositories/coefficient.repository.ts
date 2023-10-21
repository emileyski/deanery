import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Coefficient } from '../entities/coefficient.entity';

@Injectable()
export class CoefficientRepository extends Repository<Coefficient> {
  constructor(private dataSource: DataSource) {
    super(Coefficient, dataSource.createEntityManager());
  }
}

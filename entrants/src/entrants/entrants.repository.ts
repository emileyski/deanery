import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Entrant } from './entities/entrant.entity';

@Injectable()
export class EntrantsRepository extends Repository<Entrant> {
  constructor(private dataSource: DataSource) {
    super(Entrant, dataSource.createEntityManager());
  }
}

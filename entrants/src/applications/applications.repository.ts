import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationRepository extends Repository<Application> {
  constructor(private dataSource: DataSource) {
    super(Application, dataSource.createEntityManager());
  }
}

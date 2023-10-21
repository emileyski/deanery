import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Certificate } from './entities/certificate.entity';

@Injectable()
export class CertificatesRepository extends Repository<Certificate> {
  constructor(private dataSource: DataSource) {
    super(Certificate, dataSource.createEntityManager());
  }
}

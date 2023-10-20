import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Certificate } from 'crypto';

@Injectable()
export class CertificatesRepository extends Repository<Certificate> {
  constructor(private dataSource: DataSource) {
    super(Certificate, dataSource.createEntityManager());
  }
}

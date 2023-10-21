import { Module } from '@nestjs/common';
import { NatsModule } from './nats/nats.module';
import { CertificatesModule } from './certificates/certificates.module';
import { EntrantsModule } from './entrants/entrants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrant } from './entrants/entities/entrant.entity';
import { Certificate } from './certificates/entities/certificate.entity';
import { SpecialtiesModule } from './specialties/specialties.module';
import { Specialty } from './specialties/entities/speciality.entity';
import { Coefficient } from './specialties/entities/coefficient.entity';
import { ApplicationsModule } from './applications/applications.module';
import { Application } from './applications/entities/application.entity';

@Module({
  imports: [
    NatsModule,
    CertificatesModule,
    EntrantsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'db',
      autoLoadEntities: true,
      synchronize: true,
      entities: [Entrant, Certificate, Specialty, Coefficient, Application],
    }),
    SpecialtiesModule,
    ApplicationsModule,
  ],
})
export class AppModule {}

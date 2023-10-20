import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { AuthorizatedMiddleware } from './middlewares/require-auth.middleware';
// import { RoleCheckMiddleware } from './middlewares/role-check.middleware';
import { NatsModule } from './nats/nats.module';
import { CertificatesModule } from './certificates/certificates.module';
import { EntrantsModule } from './entrants/entrants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrant } from './entrants/entities/entrant.entity';
import { Certificate } from './certificates/entities/certificate.entity';

@Module({
  controllers: [AppController],
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
      entities: [Entrant, Certificate],
    }),
  ],
})
export class AppModule {}

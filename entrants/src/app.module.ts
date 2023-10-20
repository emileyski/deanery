import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { AuthorizatedMiddleware } from './middlewares/require-auth.middleware';
// import { RoleCheckMiddleware } from './middlewares/role-check.middleware';

@Module({
  controllers: [AppController],
})
export class AppModule {}

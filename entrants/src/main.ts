import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/entrants/');

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Specify the allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3000, () => {
    console.log('Entrants service is listening at port 3000');
  });
}
bootstrap();

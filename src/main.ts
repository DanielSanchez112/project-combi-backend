import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
dotenv.config();


async function boostrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173'], // Permitir solo estos dominios
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization', // Encabezados permitidos
    credentials: true, // Permitir cookies y autenticación en CORS
  });
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }))


  await app.listen(process.env.PORT || 3000)
  console.log(`Application is running on: ${await app.getUrl()}`);
}


boostrap()
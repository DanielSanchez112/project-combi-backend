import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
dotenv.config();


async function boostrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }))


  await app.listen(process.env.PORT || 3000)
}


boostrap()
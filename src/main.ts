import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar microservicio MQTT para suscripciones
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: process.env.MQTT_URL || 'mqtt://localhost:1883',
      clientId: 'nestjs-mqtt-subscriber',
      // Configuraciones adicionales de MQTT
      subscribeOptions: {
        qos: 1, // Quality of Service: 0, 1 o 2
      },
      keepalive: 60, // Mantener la conexión viva (en segundos)
    },
  });

  app.enableCors({
    origin: '*', // O usa tu dominio específico
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Si usas autenticación con cookies o tokens
  });
  
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      return res.status(200).json({});
    }
    next();
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));

  // Iniciar microservicios antes de escuchar en HTTP
  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`MQTT microservice is listening on: ${process.env.MQTT_URL || 'mqtt://localhost:1883'}`);
}
bootstrap();
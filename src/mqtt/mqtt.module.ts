import { Module, OnModuleInit } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttController } from './mqtt.controller';
import { MqttService } from './mqtt.service';
import { MqttSubscriptionsController } from './mqtSub.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: process.env.MQTT_URL || 'mqtt://localhost:1883',
          clientId: 'mqtt-nestjs-client',
          subscribeOptions: {
            qos: 1,
          },
        },
      },
    ]),
  ],
  controllers: [MqttController, MqttSubscriptionsController], // Añadido el nuevo controlador
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule implements OnModuleInit {
  onModuleInit() {
    console.log('MqttModule inicializado');
  }
}
import { Module, OnModuleInit } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttController } from './mqtt.controller';
import { MqttService } from './mqtt.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://localhost:1883', // o el host de tu broker EMQX o Mosquitto
        },
      },
    ]),
  ],
  controllers: [MqttController],
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule implements OnModuleInit {
  onModuleInit() {
    console.log('MqttModule inicializado');
  }
}
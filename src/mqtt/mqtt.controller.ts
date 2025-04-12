import { Controller, Post, Body, Param } from '@nestjs/common';
import { MqttService } from './mqtt.service';

@Controller('ubicacion')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @Post('ruta/:rutaId')
  async publicarUbicacion(
    @Param('rutaId') rutaId: number,
    @Body() body: { lat: number; lng: number; idVehiculo: number },
  ) {
    const data = {
      ...body,
      timestamp: new Date().toISOString(),
    };
    console.log(`Recibiendo solicitud para ruta: ${rutaId}`, data)
    await this.mqttService.publishLocation(rutaId, data);
    return { message: 'Ubicación publicada', data };
  }
}

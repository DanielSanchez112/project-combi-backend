// mqtt-subscriptions.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class MqttSubscriptionsController {
  // Suscribirse a un tópico específico
  @MessagePattern('ubicacion/ruta/+')
  handleLocationUpdates(@Payload() data: any) {
    console.log('Recibida actualización de ubicación:', data);
    // Aquí puedes procesar los datos recibidos
    return { received: true, data };
  }

  // Suscribirse a todos los mensajes de ubicación
  @MessagePattern('ubicacion/#')
  handleAllLocationUpdates(@Payload() data: any) {
    console.log('Recibida actualización de cualquier ubicación:', data);
    // Procesar datos
    return { received: true, data };
  }

  // Puedes añadir más suscripciones según necesites
  @MessagePattern('vehiculos/estado/+')
  handleVehicleStatusUpdates(@Payload() data: any) {
    console.log('Estado del vehículo actualizado:', data);
    // Procesar datos
    return { received: true };
  }
}
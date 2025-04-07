
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import Aedes, * as aedes from 'aedes';

@Injectable()
export class MqttService implements OnModuleInit {
    private broker: Aedes;

    constructor(
        @Inject('MQTT_SERVICE') private readonly mqttClient: ClientProxy,
    ) {}
    
    async onModuleInit() {
        try {
            await this.mqttClient.connect();
            console.log('Conectado al broker MQTT');
        } catch (error) {
            console.error('Error al conectar al broker MQTT', error);
        }
    }

    async publishLocation(rutaId: number, data: any) {
        const topic = `ubicacion/ruta/${rutaId}`;
        try {
            console.log(`Ubicación publicada en el topic ${topic}:`, data);
            console.log("----------------------TOPIC----------------------");
            await this.mqttClient.emit(topic, data).toPromise();
            return `Ubicación publicada en ${topic}`;
        } catch (error) {
            console.error("Error en MQTT publishLocation:", error);
            console.log("----------------------TOPIC----------------------");
            return { error: 'Error al publicar la ubicación' };
        }
    }
}

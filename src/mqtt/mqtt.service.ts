import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MqttService {
    constructor(
        @Inject('MQTT_SERVICE') private readonly mqttClient: ClientProxy,
    ){}
    
    onMOduleInit(){
        this.mqttClient.connect()
            .then(() => console.log('Conectado al broker MQTT'))
            .catch((error) => console.error('Error al conectar al broker MQTT', error))
    }


    async publishLocation(rutaId: number, data: any) {
        const topic = `ubicacion/ruta/${rutaId}`
        try{
            console.log(`Ubicación publicada en el topic ${topic}:`, data)
            console.log("----------------------TOPIC----------------------")
            await this.mqttClient.emit(topic, data)
            return `Ubicación publicada en ${topic}`
        }catch (error){
            console.log("----------------------TOPIC----------------------")
            return { error: 'Error al publicar la ubicación' }
        }

    }
}

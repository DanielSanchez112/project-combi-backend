import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import { CreateRutaConOrdenDto } from "./dto/create_orden.dto"

@Injectable()
export class OrdenService{
    constructor (private prisma: PrismaService) {}

    //crear orden
    async create(createRutasConParadas: CreateRutaConOrdenDto){
        return this.prisma.$transaction(async(prisma) => {
            // creacion de la ruta
            const ruta = await prisma.rutas.create({
                data: {
                    nombre: createRutasConParadas.nombreRuta
                }
            })

            // creacion de las paradas y su orden
            const paradasConOrden = await Promise.all(
                createRutasConParadas.paradas.map(async (parada) => {
                    //crear parada
                    const crearParada = await prisma.paradas.create({
                        data: {
                            nombre: parada.nombre,
                            latitud: parada.latitud,
                            longitud: parada.longitud
                        }
                    })

                    //crear orden de parada en ruta
                    const rutaParadaOrden = await prisma.rutas_paradas_orden.create({
                        data: {
                            id_ruta: ruta.id_ruta,
                            id_parada: crearParada.id_parada,
                            orden: parada.orden
                        }
                    })

                    return {parada: crearParada, orden: rutaParadaOrden}
                })
            )
            return {
                ruta,
                paradas: paradasConOrden.map((item) => item.parada),
                rutasParadaOrden: paradasConOrden.map((item) => item.orden)
            }
        })
    }

    //buscar todas las rutas
    async findAll(){
        return this.prisma.rutas.findMany()
    }

    //buscar ruta mediante id
    async findOne(id: number){
        return this.prisma.rutas.findUnique({
            where: {id_ruta: id}
        })
    }

    //eliminar ruta
    async remove(id: number){
        return this.prisma.$transaction(async(prisma) => {
            //eliminar orden de paradas
            await prisma.rutas_paradas_orden.deleteMany({
                where: {id_ruta: id}
            })

            //eliminar rutas
            await prisma.rutas.delete({
                where: {id_ruta: id}
            })
        })
    }
}

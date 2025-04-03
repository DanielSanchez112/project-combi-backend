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

    //actualizar ruta con paradas
    async update(id: number, updateRutaConParadas: CreateRutaConOrdenDto) {
        return this.prisma.$transaction(async(prisma) => {
            // 1. Actualizar nombre de la ruta si se proporciona
            let ruta = null;
            if (updateRutaConParadas.nombreRuta) {
                ruta = await prisma.rutas.update({
                    where: { id_ruta: id },
                    data: {
                        nombre: updateRutaConParadas.nombreRuta
                    }
                });
            } else {
                // Si no se proporciona nombre, obtener la ruta actual
                ruta = await prisma.rutas.findUnique({
                    where: { id_ruta: id }
                });
            }

            // 2. Procesar cada parada del DTO de actualización
            const paradasProcesadas = [];
            const rutasParadasOrdenProcesadas = [];

            for (const paradaDto of updateRutaConParadas.paradas) {
                let paradaEntity;
                let rutaParadaOrdenEntity;
                
                console.log(paradaDto)
                // Si la parada tiene ID, actualizar la existente
                if (paradaDto.id_parada) {
                    // Actualizar la parada existente
                    paradaEntity = await prisma.paradas.update({
                        where: { id_parada: paradaDto.id_parada },
                        data: {
                            nombre: paradaDto.nombre,
                            latitud: paradaDto.latitud,
                            longitud: paradaDto.longitud
                        }
                    });

                    // Buscar si existe relación entre esta parada y esta ruta
                    const relacionExistente = await prisma.rutas_paradas_orden.findFirst({
                        where: { 
                            id_ruta: id,
                            id_parada: paradaDto.id_parada
                        }
                    });
                    console.log(relacionExistente)

                    if (relacionExistente) {
                        // Actualizar la relación existente usando id_parada e id_ruta
                        rutaParadaOrdenEntity = await prisma.rutas_paradas_orden.update({
                            where: { id_orden: relacionExistente.id_orden },
                            data: { orden: paradaDto.orden }
                        });
                    } else {
                        // Crear nueva relación para una parada existente que no estaba en esta ruta
                        rutaParadaOrdenEntity = await prisma.rutas_paradas_orden.create({
                            data: {
                                id_ruta: id,
                                id_parada: paradaDto.id_parada,
                                orden: paradaDto.orden
                            }
                        });
                    }
                } else {
                    // Crear una nueva parada
                    paradaEntity = await prisma.paradas.create({
                        data: {
                            nombre: paradaDto.nombre,
                            latitud: paradaDto.latitud,
                            longitud: paradaDto.longitud
                        }
                    });

                    // Crear la relación para la nueva parada
                    rutaParadaOrdenEntity = await prisma.rutas_paradas_orden.create({
                        data: {
                            id_ruta: id,
                            id_parada: paradaEntity.id_parada,
                            orden: paradaDto.orden
                        }
                    });
                }

                paradasProcesadas.push(paradaEntity);
                rutasParadasOrdenProcesadas.push(rutaParadaOrdenEntity);
            }

            return {
                ruta,
                paradas: paradasProcesadas,
                rutasParadaOrden: rutasParadasOrdenProcesadas
            };
        });
    }
    
    //buscar todas las rutas
    async findAll(){
        return this.prisma.rutas_paradas_orden.findMany({
            include: {
                paradas: true
            }
        })
    }

    //buscar ruta mediante id
    async findOne(id: number){
        return this.prisma.rutas_paradas_orden.findMany({
            where: {id_ruta: id},
            include: {
                paradas: true
            }
        })
    }

    //buscar ruta mediante id
    //obtener ruta con paradas ordenadas
    async getRutaConParadas(id: number) {
        // Obtener la ruta
        const ruta = await this.prisma.rutas.findUnique({
            where: { id_ruta: id }
        });

        if (!ruta) {
            return null;
        }

        // Obtener las paradas con su orden
        const paradasConOrden = await this.prisma.rutas_paradas_orden.findMany({
            where: { id_ruta: id },
            include: {
                paradas: true
            },
            orderBy: {
                orden: 'asc'
            }
        });

        return {
            ruta,
            paradas: paradasConOrden.map(item => ({
                ...item.paradas,
                orden: item.orden
            }))
        };
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

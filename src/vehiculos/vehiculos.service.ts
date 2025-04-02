import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateVehiculoDto } from "./dto/create_vehiculo.dto";
import { UpdateVehiculoDto } from "./dto/update_vehiculo.dto";

@Injectable()
export class VehiculosService{
    constructor(private prisma: PrismaService) {}

    //crear vehiculo
    async create(createVehiculo: CreateVehiculoDto){
        try {
            console.log(createVehiculo)
            return this.prisma.vehiculos.create({
                data: createVehiculo
            })
        } catch (error) {
            return error
        }
    }

    //buscar todos los vehiculos
    async findAll(){
        return this.prisma.vehiculos.findMany({
            include: {rutas: true}
        })
    }

    //buscar vehiculo mediante id
    async findOne(id: number){
        return this.prisma.vehiculos.findUnique({
            where: {id_vehiculos: id},
            include: {rutas: true}
        })
    }

    //actualizar vehiculo
    async update(id: number, update: UpdateVehiculoDto){
        return this.prisma.vehiculos.update({
            where: {id_vehiculos: id},
            data: update
        })
    }

    //eliminar vehiculo
    async remove(id: number){
        return this.prisma.vehiculos.delete({
            where: {id_vehiculos: id}
        })
    }

    //buscar vehiculos por dueño
    async findByOwner(id: number){
        return this.prisma.vehiculos.findMany({
            where: {id_dueno: id}
        })
    }

    //buscar vehiculo por numero
    async findByNumber(numero: string){
        return this.prisma.vehiculos.findFirst({
            where: {numero}
        })
    }

    //buscar vehiculos por matricula
    async findByMatricula(matricula: string){
        return this.prisma.vehiculos.findFirst({
            where: {matricula}
        })
    }

}
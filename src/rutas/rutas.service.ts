import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateRutasDto } from "./dto/create_rutas.dto";
import { UpdateRutasDto } from "./dto/update_rutas.dto";

@Injectable()
export class RutasService{
    constructor(private prisma: PrismaService) {}

    //crear ruta
    async create(createRutas: CreateRutasDto){
        return this.prisma.rutas.create({
            data: createRutas
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

    //actualizar ruta
    async update(id: number, update: UpdateRutasDto){
        return this.prisma.rutas.update({
            where: {id_ruta: id},
            data: update
        })
    }

    //eliminar ruta
    async remove(id: number){
        return this.prisma.rutas.delete({
            where: {id_ruta: id}
        })
    }
}
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateDueñoDto } from "./dto/create_dueño.dto";


@Injectable()
export class DuenoService{
    constructor(private prisma: PrismaService) {}

    //crear dueño
    async create(createDueno: CreateDueñoDto){
        return this.prisma.duenos.create({
            data: createDueno
        })
        
    }

    //buscar todos los dueños
    async findAll(){
        return this.prisma.duenos.findMany()
    }

    //buscar dueño mediante id
    async findOne(id: number){
        return this.prisma.duenos.findUnique({
            where: {id_dueno: id}
        })
    }

    //actualizar dueño
    async update(id: number, update: CreateDueñoDto){
        return this.prisma.duenos.update({
            where: {id_dueno: id},
            data: update
        })
    }

    //eliminar dueño
    async remove(id: number){
        return this.prisma.duenos.delete({
            where: {id_dueno: id}
        })
    }
}
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateChecadorDto } from "./dto/create_checador.dto";
import { UpdateChecadorDto } from "./dto/update_checador.dto";

@Injectable()
export class ChecadorService{
    constructor(private prisma: PrismaService) {}

    //crear checador
    async create(createChecador: CreateChecadorDto){
        return this.prisma.checadores.create({
            data: createChecador
        })
        
    }

    //buscar todos los checadores
    async findAll(){
        return this.prisma.checadores.findMany()
    }

    //buscar checador mediante id
    async findOne(id: number){
        return this.prisma.checadores.findUnique({
            where: {id_checador: id}
        })
    }

    //actualizar checador
    async update(id: number, update: UpdateChecadorDto){
        return this.prisma.checadores.update({
            where: {id_checador: id},
            data: update
        })
    }

    //eliminar checador
    async remove(id: number){
        return this.prisma.checadores.delete({
            where: {id_checador: id}
        })
    }
}
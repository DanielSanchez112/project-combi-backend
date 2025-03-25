import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateParadaDto } from "./dto/create_parada.dto";
import { UpdateParadaDto } from "./dto/update_parada.dto";

@Injectable()
export class ParadasService{
    constructor(private prisma: PrismaService) {}

    //crear parada
    async create(createParada: CreateParadaDto){
        return this.prisma.paradas.create({
            data: createParada
        })
    }

    //buscar todas las paradas
    async findAll(){
        return this.prisma.paradas.findMany()
    }

    //buscar parada mediante id
    async findOne(id: number){
        return this.prisma.paradas.findUnique({
            where: {id_parada: id}
        })
    }

    //actualizar parada
    async update(id: number, update: UpdateParadaDto){
        return this.prisma.paradas.update({
            where: {id_parada: id},
            data: update
        })
    }

    //eliminar parada
    async remove(id: number){
        return this.prisma.paradas.delete({
            where: {id_parada: id}
        })
    }
}
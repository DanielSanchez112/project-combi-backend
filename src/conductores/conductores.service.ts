import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import { CreateConductoresDto } from "./dto/create_conductores.dto"
import { UpdateConductoresDto } from "./dto/update_conducotres.dto"

@Injectable()
export class ConductoresService{
    constructor(private prisma: PrismaService) {}

    //crear conductor
    async create(createConductor: CreateConductoresDto){
        return this.prisma.conductor.create({
            data: createConductor
        })
    }

    //buscar todos los conductores
    async findAll(){
        return this.prisma.conductor.findMany()
    }

    //buscar conductor mediante id
    async findOne(id: number){
        return this.prisma.conductor.findUnique({
            where: {id_conductor: id}
        })
    }

    //actualizar conductor
    async update(id: number, update: UpdateConductoresDto){
        return this.prisma.conductor.update({
            where: {id_conductor: id},
            data: update
        })
    }
    
    //eliminar conductor
    async remove(id: number){
        return this.prisma.conductor.delete({
            where: {id_conductor: id}
        })
    }


}
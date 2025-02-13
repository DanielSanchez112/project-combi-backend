import {Injectable, NotFoundException} from '@nestjs/common'
import {PrismaService} from '../prisma.service'
import {CreatePersonaDto} from './dto/create_persona.dto'
import {UpdatePersonaDto} from './dto/update_persona.dto'

@Injectable()
export class PersonaService{
    constructor(private prisma: PrismaService) {}

    //nuevo tipo de usuario
    async create(createPersona: CreatePersonaDto) {
        // Convertir la cadena de fecha a un objeto Date
        const fechaNac = createPersona.fecha_nac ? new Date(createPersona.fecha_nac) : undefined;
      
        return this.prisma.personas.create({
          data: {
            ...createPersona,
            fecha_nac: fechaNac, // Usar el objeto Date
          },
        });
      }

    //buscar todos lo tipo usuario
    async findAll(){
        return this.prisma.personas.findMany()
    }

    //buscar al tipo usuario mediante id
    async finfOne(id: number){
        const persona = await this.prisma.personas.findUnique({
            where: {id_persona: id}
        })

        if(!persona){
            throw new NotFoundException(`Persona con id ${id} no encontrado`)
        }

        return persona
    }

    //actualizar tipo usuario
    async update(id: number, update: UpdatePersonaDto){
        try {
            return await this.prisma.personas.update({
                where: {id_persona: id},
                data: update,
            })
        } catch (error) {
            throw new NotFoundException(`Persona con ID ${id} no encontrado`)
        }
    }

    //eliminar tipo usuario
    async remove(id: number){
        try {
            return await this.prisma.personas.delete({
                where: {id_persona: id}
            })
        } catch (error) {
            throw new NotFoundException(`Persona con ID ${id} no encontrado`)
        }
    }
}

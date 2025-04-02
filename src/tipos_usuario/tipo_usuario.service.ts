import {Injectable, NotFoundException, UseFilters, UseInterceptors} from '@nestjs/common'
import {PrismaService} from '../prisma.service'
import {CreateTipoUsuarioDto} from './dto/create_tipo_usuario.dto'
import {UpdateTipoUsuarioDto} from './dto/update_tipo_usuario.dto'
import { GlobalExceptionFilter } from 'src/GEF'
import { SuccessInterceptor } from 'src/SI'

@Injectable()

export class TipoUsuarioService{
    constructor(private prisma: PrismaService) {}

    //nuevo tipo de usuario
    async create(createTipoUsuario: CreateTipoUsuarioDto){
        return this.prisma.tipo_usuarios.create({
            data: createTipoUsuario
        })
    }

    //buscar todos lo tipo usuario
    async findAll(){
        return this.prisma.tipo_usuarios.findMany()
    }

    //buscar al tipo usuario mediante id
    async finfOne(id: number){
        const tipoUsuario = await this.prisma.tipo_usuarios.findUnique({
            where: {id_tipo_usuario: id}
        })

        if(!tipoUsuario){
            throw new NotFoundException(`Tipo usuario con id ${id} no encontrado`)
        }

        return tipoUsuario
    }

    //actualizar tipo usuario
    async update(id: number, update: UpdateTipoUsuarioDto){
        try {
            return await this.prisma.tipo_usuarios.update({
                where: {id_tipo_usuario: id},
                data: update,
            })
        } catch (error) {
            throw new NotFoundException(`Tipo de usuario con ID ${id} no encontrado`)
        }
    }

    //eliminar tipo usuario
    async remove(id: number){
        try {
            return await this.prisma.tipo_usuarios.delete({
                where: {id_tipo_usuario: id}
            })
        } catch (error) {
            throw new NotFoundException(`Tipo de usuario con ID ${id} no encontrado`)
        }
    }
}
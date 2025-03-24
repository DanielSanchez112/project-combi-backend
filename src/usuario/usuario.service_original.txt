import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, UseFilters } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUsuarioDto } from './dto/create_usuario.dto';
import { PersonaService } from '../persona/persona.service';
import { DuenoService } from '../dueños/dueños.service';
import * as bcrypt from 'bcrypt';
import { GlobalExceptionFilter } from 'src/GEF';

@Injectable()
export class UsuariosService {
  constructor(
    private prisma: PrismaService,
    private personaService: PersonaService,
    private duenoService: DuenoService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    if (!createUsuarioDto.usuario || !createUsuarioDto.contrasena || !createUsuarioDto.correo || !createUsuarioDto.id_tipo_usuario) {
      throw new BadRequestException('Todos los campos son obligatorios: usuario, contraseña, correo, id_tipo_usuario');
    }
  
    try {
      createUsuarioDto.persona = createUsuarioDto.persona || {};
  
      // Crear la persona
      const persona = await this.personaService.create(createUsuarioDto.persona);
      if (!persona) {
        throw new BadRequestException('Error al crear la persona asociada');
      }
  
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(createUsuarioDto.contrasena, 10);
  
      // Crear el usuario en la base de datos
      const usuario = await this.prisma.usuarios.create({
        data: {
          usuario: createUsuarioDto.usuario,
          contrasena: hashedPassword,
          correo: createUsuarioDto.correo,
          id_tipo_usuario: createUsuarioDto.id_tipo_usuario,
          activo: 1,
          id_persona: persona.id_persona,
        },
        include: {
          personas: true,
        },
      });
      if (usuario.id_tipo_usuario == 2){
        const dueno = await this.duenoService.create({
          id_usuario: usuario.id_usuario,
        })

        return {
          id_usuario: usuario.id_usuario,
          usuario: usuario.usuario,
          correo: usuario.correo,
          id_tipo_usuario: usuario.id_tipo_usuario,
          persona: {
            nombre: usuario.personas.nombre,
            apellido_pat: usuario.personas.apellido_pat,
            apellido_mat: usuario.personas.apellido_mat,
            sexo: usuario.personas.sexo,
            fecha_nac: usuario.personas.fecha_nac,
            curp: usuario.personas.curp,
            rfc: usuario.personas.rfc,
          },
          dueno: { 
            id_dueno: dueno.id_dueno
          },
        }
      }
      
    } catch (error) {
      console.error('Error al registrar usuario:', error);
  
      if (error.code === 'P2002') {
        throw new BadRequestException('El usuario o correo ya están en uso');
      }
  
      throw new InternalServerErrorException('Error interno al registrar el usuario');
    }
  }
  

  async findOne(id: number) {
    try {
      const usuario = await this.prisma.usuarios.findUnique({
        where: { id_usuario: id },
        include: { personas: true, tipo_usuarios: true },
      });

      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }

      const { contrasena, ...result } = usuario;
      return result;
    } catch (error) {
      console.error(`Error al buscar usuario con ID ${id}:`, error);
      throw new InternalServerErrorException('Error interno al buscar el usuario');
    }
  }

  async findAll() {
    try {
      const usuarios = await this.prisma.usuarios.findMany({
        include: { personas: true, tipo_usuarios: true },
      });

      return usuarios.map(({ contrasena, ...usuario }) => usuario);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw new InternalServerErrorException('Error interno al obtener los usuarios');
    }
  }
}

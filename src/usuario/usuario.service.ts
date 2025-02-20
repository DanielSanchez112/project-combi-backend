import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUsuarioDto } from './dto/create_usuario.dto';
import { PersonaService } from '../persona/persona.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    private prisma: PrismaService,
    private personaService: PersonaService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      // Verificamos si hay datos de persona
      if (!createUsuarioDto.persona) {
        createUsuarioDto.persona = {}; // Creamos un objeto vacío si no hay datos de persona
      }
  
      // Creamos la persona
      const persona = await this.personaService.create(createUsuarioDto.persona);
      if (!persona) {
        throw new HttpException('Error al crear la persona', HttpStatus.BAD_REQUEST);
      }
  
      // Encriptamos la contraseña
      const hashedPassword = await bcrypt.hash(createUsuarioDto.contrasena, 10);
      if (!hashedPassword) {
        throw new HttpException('Error al encriptar la contraseña', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  
      // Creamos el usuario con el id_persona obtenido
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
  
      if (!usuario) {
        throw new HttpException('Error al crear el usuario', HttpStatus.BAD_REQUEST);
      }
  
      const { contrasena, ...usuarioSinContrasena } = usuario;
      return usuarioSinContrasena;
    } catch (error) {
      throw new HttpException(error.message || 'Error interno del servidor', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  async findOne(id: number) {
    const usuario = await this.prisma.usuarios.findUnique({
      where: {
        id_usuario: id
      },
      include: {
        personas: true,
        tipo_usuarios: true
      }
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    const { contrasena, ...result } = usuario;
    return result;
  }

  async findAll() {
    const usuarios = await this.prisma.usuarios.findMany({
      include: {
        personas: true,
        tipo_usuarios: true
      }
    });

    // Ocultamos la contraseña de los usuarios
    return usuarios.map(usuario => {
      const { contrasena, ...result } = usuario;
      return result;
    });
  }
}

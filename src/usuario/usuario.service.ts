import { Injectable, NotFoundException } from '@nestjs/common';
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
    // Verificamos si hay datos de persona
    if (!createUsuarioDto.persona) {
      createUsuarioDto.persona = {}; // Creamos un objeto vacío si no hay datos de persona
    }

    // Creamos la persona
    const persona = await this.personaService.create(createUsuarioDto.persona);

    // Encriptamos la contraseña
    const hashedPassword = await bcrypt.hash(createUsuarioDto.contrasena, 10);

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

    const { contrasena, ...usuarioSinContrasena } = usuario;
    return usuarioSinContrasena;
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

    // Removemos las contraseñas de todos los usuarios
    return usuarios.map(usuario => {
      const { contrasena, ...result } = usuario;
      return result;
    });
  }
}

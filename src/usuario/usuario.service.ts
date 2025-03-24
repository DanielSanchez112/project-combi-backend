import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, UseFilters } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUsuarioDto } from './dto/create_usuario.dto';
import { PersonaService } from '../persona/persona.service';
import { DuenoService } from '../dueños/dueños.service';
import { ConductoresService } from '../conductores/conductores.service';
import { ChecadorService } from '../checadores/checadores.service'
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    private prisma: PrismaService,
    private personaService: PersonaService,
    private duenoService: DuenoService,
    private conductoresService: ConductoresService,
    private checadorService: ChecadorService
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    if (!createUsuarioDto.usuario || !createUsuarioDto.contrasena || !createUsuarioDto.correo || !createUsuarioDto.id_tipo_usuario) {
      throw new BadRequestException('Todos los campos son obligatorios: usuario, contraseña, correo, id_tipo_usuario');
    }
  
    try {
      console.log('🔥 Datos recibidos en el servicio:', JSON.stringify(createUsuarioDto, null, 2));

      createUsuarioDto.persona = createUsuarioDto.persona || {};
  
      // Crear la persona
      const persona = await this.personaService.create(createUsuarioDto.persona);
      if (!persona) {
        throw new BadRequestException('Error al crear la persona asociada');
      }
      console.log('✅ Persona creada:', persona);

  
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(createUsuarioDto.contrasena, 10);
      console.log('🔐 Contraseña encriptada:', hashedPassword);

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
      
      let additionalData = {};
  
      if (usuario.id_tipo_usuario == 2) { // Dueño
        const dueno = await this.duenoService.create({ id_usuario: usuario.id_usuario });
        additionalData = { dueno: { id_dueno: dueno.id_dueno } };
      } else if (usuario.id_tipo_usuario == 3) { // Conductor
        const conductor = await this.conductoresService.create({ id_usuario: usuario.id_usuario });
        additionalData = { conductor: { id_conductor: conductor.id_conductor } };
      }else if (usuario.id_tipo_usuario == 4) { // Checador
        const checador = await this.checadorService.create({ id_usuario: usuario.id_usuario });
        additionalData = { checador: { id_checador: checador.id_checador } };
      }
  
      console.log('🎉 Usuario creado:', usuario);
      return usuario
  
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
      throw new InternalServerErrorException(`Error al buscar usuario con ID ${id}:`, error);
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

import { PrismaService } from '../prisma.service';
import { Injectable, UnauthorizedException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    // Validar que los datos sean cadenas de texto y no estén vacíos
    if (!loginDto.usuario || typeof loginDto.usuario !== 'string' || 
        !loginDto.contrasena || typeof loginDto.contrasena !== 'string') {
      throw new BadRequestException('Usuario y contraseña son requeridos y deben ser cadenas de texto');
    }

    let usuario;
    try {
      // Buscar usuario en la base de datos
      usuario = await this.prisma.usuarios.findFirst({
        where: {
          usuario: loginDto.usuario,
          activo: 1,
        },
        include: {
          tipo_usuarios: true,
        },
      });

      if (!usuario) {
        throw new UnauthorizedException('Credenciales incorrectas');
        throw new HttpException('Correo o contraseña incorrectos', HttpStatus.UNAUTHORIZED);
      }

      if (!usuario.contrasena) {
        throw new UnauthorizedException('Error en la configuración de la cuenta');
      }
    } catch (error) {
      console.error('Error al consultar la base de datos:', error);
      throw new InternalServerErrorException('Error interno del servidor, intenta más tarde');
    }

    try {
      // Verificar la contraseña
      const isPasswordValid = await bcrypt.compare(loginDto.contrasena, usuario.contrasena);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en la verificación de contraseña:', error);
      throw new InternalServerErrorException('Error en la autenticación, intenta más tarde');
    }

    try {
      // Generar JWT
      const payload = {
        sub: usuario.id_usuario,
        username: usuario.usuario,
        tipo: usuario.tipo_usuarios?.id_tipo_usuario,
      };
      console.log('Payload:', payload);
      console.log('Usuario:', usuario);
      return {
        access_token: await this.jwtService.signAsync(payload),
        usuario: {
          id: usuario.id_usuario,
          usuario: usuario.usuario,
          tipo_usuario: usuario.tipo_usuarios,
          correo: usuario.correo,
        },
      };
    } catch (error) {
      console.error('Error al generar el token JWT:', error);
      throw new InternalServerErrorException('Error en la autenticación, intenta más tarde');
    }
  }

  // Método auxiliar para hashear contraseñas (útil para crear usuarios)
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}


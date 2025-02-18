import {PrismaService} from '../prisma.service'
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    if (!loginDto.usuario || !loginDto.contrasena) {
      throw new BadRequestException('Usuario y contraseña son requeridos');
    }

    // Buscar usuario
    const usuario = await this.prisma.usuarios.findFirst({
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
    }

    // Verificar que la contraseña en la base de datos no sea nula
    if (!usuario.contrasena) {
      throw new UnauthorizedException('Error en la configuración de la cuenta');
    }

    try {
      // Verificar contraseña
      const isPasswordValid = await bcrypt.compare(
        loginDto.contrasena,
        usuario.contrasena,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Credenciales incorrectas');
      }

      // Generar JWT
      const payload = {
        sub: usuario.id_usuario,
        username: usuario.usuario,
        tipo: usuario.tipo_usuarios?.id_tipo_usuario,
      };

      return {
        access_token: await this.jwtService.signAsync(payload),
        usuario: {
          id: usuario.id_usuario,
          usuario: usuario.usuario,
          tipo_usuario: usuario.tipo_usuarios,
        },
      };
    } catch (error) {
      console.error('Error en la verificación de contraseña:', error);
      throw new UnauthorizedException('Error en la autenticación');
    }
  }

  // Método auxiliar para hashear contraseñas (útil para crear usuarios)
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
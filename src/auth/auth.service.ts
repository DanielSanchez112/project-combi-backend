import { Injectable, UnauthorizedException } from '@nestjs/common';
import {PrismaService} from '../prisma.service'
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
    // Buscar usuario
    const usuario = await this.prisma.usuarios.findFirst({
      where: {
        usuario: loginDto.usuario,
        activo: 1, // Asumiendo que 1 significa activo
      },
      include: {
        tipo_usuarios: true,
      },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

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
  }
}
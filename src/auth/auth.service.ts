import { Injectable, UnauthorizedException } from '@nestjs/common';
import {PrismaService} from '../prisma.service'
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.prisma.usuarios.findFirst({
      where: { usuario: username },
    });



    if (user) {
    console.log('Usuario encontrado:', user); // Log para depuración
    const isPasswordValid = await bcrypt.compare(password, user.contrasena);
    console.log('¿Contraseña válida?', isPasswordValid); // Log para depuración

    if (isPasswordValid) {
      const { contrasena, ...result } = user;
      return result;
    }
  }

    return null;
  }
}
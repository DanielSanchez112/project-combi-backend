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

    if (user && await bcrypt.compare(password, user.contrasena)) {
      const { contrasena, ...result } = user;
      return result;
    }
    return null;
  }
}
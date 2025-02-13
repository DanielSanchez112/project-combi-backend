import { Module } from '@nestjs/common';
import { UsuariosService } from './usuario.service';
import { UsuariosController } from './usuario.controller';
import { PrismaService } from '../prisma.service';
import { PersonaService } from '../persona/persona.service';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, PrismaService, PersonaService],
})
export class UsuariosModule {}
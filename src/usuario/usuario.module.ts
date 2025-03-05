import { Module } from '@nestjs/common';
import { UsuariosService } from './usuario.service';
import { UsuariosController } from './usuario.controller';
import { PrismaService } from '../prisma.service';
import { PersonaService } from '../persona/persona.service';
import { DuenoService } from 'src/dueños/dueños.service';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, PrismaService, PersonaService, DuenoService],
})
export class UsuariosModule {}
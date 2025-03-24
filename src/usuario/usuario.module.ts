import { Module } from '@nestjs/common';
import { UsuariosService } from './usuario.service';
import { UsuariosController } from './usuario.controller';
import { PrismaService } from '../prisma.service';
import { PersonaService } from '../persona/persona.service';
import { DuenoService } from 'src/dueños/dueños.service';
import { ConductoresService } from 'src/conductores/conductores.service';
import { ChecadorService } from 'src/checadores/checadores.service';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, PrismaService, PersonaService, DuenoService, ConductoresService, ChecadorService],
})
export class UsuariosModule {}
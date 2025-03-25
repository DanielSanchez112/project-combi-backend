import { Module } from '@nestjs/common';
import { TipoUsuarioModule } from './tipos_usuario/tipo_usuario.module';
import { PersonaModule } from './persona/persona.module';
import { UsuariosModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { RutasModule } from './rutas/ruats.model';

@Module({
  imports: [
    TipoUsuarioModule,
    PersonaModule,
    UsuariosModule,
    AuthModule,
    VehiculosModule,
    RutasModule,
  ],
  providers: [PrismaService],
})

export class AppModule {}
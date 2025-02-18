import { Module } from '@nestjs/common';
import { TipoUsuarioModule } from './tipos_usuario/tipo_usuario.module';
import { PersonaModule } from './persona/persona.module';
import { UsuariosModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TipoUsuarioModule,
    PersonaModule,
    UsuariosModule,
    AuthModule,
  ],
  controllers: [], // Controladores globales si los necesitas
  providers: [], // Servicios globales si los necesitas
})
export class AppModule {}
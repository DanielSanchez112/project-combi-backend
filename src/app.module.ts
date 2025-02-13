import { Module } from '@nestjs/common';
import { TipoUsuarioModule } from './tipos_usuario/tipo_usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TipoUsuarioModule,
    AuthModule,
  ],
  controllers: [], // Controladores globales si los necesitas
  providers: [], // Servicios globales si los necesitas
})
export class AppModule {}
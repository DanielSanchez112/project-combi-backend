import { Module } from '@nestjs/common';
import { TipoUsuarioModule } from './tipos_usuario/tipo_usuario.module';

@Module({
  imports: [
    TipoUsuarioModule,
  ],
  controllers: [], // Controladores globales si los necesitas
  providers: [], // Servicios globales si los necesitas
})
export class AppModule {}
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfirmMiddleware } from './confirm.middleware';
import { PrismaService } from './prisma.service';

//modulos
import { TipoUsuarioModule } from './tipos_usuario/tipo_usuario.module';
import { PersonaModule } from './persona/persona.module';
import { UsuariosModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { RutasModule } from './rutas/ruats.model';
import { RutasParadasOrdenModule } from './rutas_paradas_orden/orden.module';
import { ConductoresModule } from './conductores/conductores.module';

@Module({
  imports: [
    TipoUsuarioModule,
    PersonaModule,
    UsuariosModule,
    AuthModule,
    VehiculosModule,
    RutasModule,
    RutasParadasOrdenModule,
    ConductoresModule,
  ],
  providers: [PrismaService],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ConfirmMiddleware)
      .forRoutes('*')
  }
}
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {PrismaModule} from '../prisma.module'


@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: 'tu_secret_key', // Usa variables de entorno en producción
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
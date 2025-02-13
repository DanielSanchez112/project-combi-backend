import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import {PrismaService} from '../prisma.service'

@Module({
  imports: [PassportModule],
  providers: [AuthService, LocalStrategy, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
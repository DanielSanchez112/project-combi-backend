import { Module } from '@nestjs/common';
import { ChecadoresController } from './checadores.controller';
import { ChecadorService } from './checadores.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [ChecadoresController],
    providers: [ChecadorService, PrismaService],
    exports: [ChecadorService],
})
export class ChecadoresModule {}
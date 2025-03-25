// src/rutas-paradas-orden/rutas-paradas-orden.module.ts
import { Module } from '@nestjs/common';
import { OrdenService } from './orden.service';
import { OrdenController } from './orden.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [OrdenController],
    providers: [OrdenService, PrismaService],
    exports: [OrdenService],
})
export class RutasParadasOrdenModule {}

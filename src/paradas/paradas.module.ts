import { Module } from "@nestjs/common";
import { ParadasController } from "./paradas.controller";
import { ParadasService } from "./paradas.service";
import { PrismaService } from "src/prisma.service";

@Module({
    controllers: [ParadasController],
    providers: [ParadasService, PrismaService],
    exports: [ParadasService],
})
export class ParadasModule {}
import { Module } from "@nestjs/common";
import { TipoUsuarioController } from "./tipo_usuario.controller";
import { TipoUsuarioService } from "./tipo_usuario.service";
import { PrismaService } from "src/prisma.service";

@Module({
    controllers: [TipoUsuarioController],
    providers: [TipoUsuarioService, PrismaService],
    exports: [TipoUsuarioService],
})
export class TipoUsuarioModule {}
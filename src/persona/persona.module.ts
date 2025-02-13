import { Module } from "@nestjs/common";
import { PersonaController } from "./persona.controller";
import { PersonaService } from "./persona.service";
import { PrismaService } from "src/prisma.service";

@Module({
    controllers: [PersonaController],
    providers: [PersonaService, PrismaService],
    exports: [PersonaService],
})
export class PersonaModule {}
import { Module } from "@nestjs/common";
import { DuenoController } from "./dueños.controller";
import { DuenoService } from "./dueños.service";
import { PrismaService } from "src/prisma.service";

@Module({
    controllers: [DuenoController],
    providers: [DuenoService, PrismaService],
    exports: [DuenoService],
})
export class DuenoModule {}
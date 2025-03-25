import { Decimal } from "@prisma/client/runtime/library"
import { IsDecimal, IsOptional } from "class-validator"


export class CreateParadaDto{
    nombre: string

    @IsDecimal()
    latitud: Decimal

    @IsDecimal()
    longitud: Decimal

    @IsOptional()
    activo: number | null
}
import { Decimal } from "@prisma/client/runtime/library"
import { IsDecimal, IsOptional, IsString } from "class-validator"


export class CreateParadaDto{
    @IsString()
    nombre: string

    @IsDecimal()
    latitud: Decimal

    @IsDecimal()
    longitud: Decimal

    @IsOptional()
    activo: number | null
}
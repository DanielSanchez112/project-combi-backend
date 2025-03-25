import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateVehiculoDto{
    @IsNumber()
    id_dueno: number

    @IsNumber()
    id_ruta?: number

    @IsString()
    numero: string

    @IsString()
    matricula: string
}
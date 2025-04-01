import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateVehiculoDto{
    @IsNumber()
    id_dueno: number

    @IsNumber()
    @IsOptional()
    id_ruta?: number | null

    @IsString()
    numero: string

    @IsString()
    matricula: string
}
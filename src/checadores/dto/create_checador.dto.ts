import { IsNumber, IsOptional } from "class-validator";

export class CreateChecadorDto{
    @IsNumber()
    id_usuario?: number

    @IsNumber()
    @IsOptional()
    id_parada?: number | null
}
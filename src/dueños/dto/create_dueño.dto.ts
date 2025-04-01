import {IsNumber, IsOptional} from 'class-validator'

export class CreateDueñoDto{
    @IsNumber()
    id_usuario?: number

    @IsNumber()
    @IsOptional()
    id_vehiculos?: number
}
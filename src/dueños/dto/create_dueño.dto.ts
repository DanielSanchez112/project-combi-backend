import {IsNumber} from 'class-validator'

export class CreateDueñoDto{
    @IsNumber()
    id_usuario?: number

}
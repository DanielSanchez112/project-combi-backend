import { IsNumber } from "class-validator"


export class CreateConductoresDto{
    @IsNumber()
    id_vehiculo?: number

    @IsNumber()
    id_usuario?: number

}
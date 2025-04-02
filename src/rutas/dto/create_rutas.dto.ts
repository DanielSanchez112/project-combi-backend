import { IsString } from "class-validator";

export class CreateRutasDto {
    @IsString()
    nombre: string;
}
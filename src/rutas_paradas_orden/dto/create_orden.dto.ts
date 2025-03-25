import { IsArray, IsDecimal, IsNumber, IsString, ValidateNested } from "class-validator"
import { Type } from 'class-transformer';
import { Decimal } from "@prisma/client/runtime/library";

export class CreateOrdenDto{
    @IsString()
    nombre: string;
  
    @IsNumber()
    latitud: number;
  
    @IsNumber()
    longitud: number;
  
    @IsNumber()
    orden: number;
}

export class CreateRutaConOrdenDto {
    @IsString()
    nombreRuta: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrdenDto)
    paradas: CreateOrdenDto[];
}
import { IsArray, IsDecimal, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"
import { Type } from 'class-transformer';

export class CreateOrdenDto{
    @IsString()
    nombre: string;
  
    @IsNumber()
    latitud: number;
  
    @IsNumber()
    longitud: number;
  
    @IsNumber()
    orden: number;

    @IsOptional()
    @IsNumber()
    id_parada?: number
}

export class CreateRutaConOrdenDto {
    @IsString()
    nombreRuta: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrdenDto)
    paradas: CreateOrdenDto[];
}
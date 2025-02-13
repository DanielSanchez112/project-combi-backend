import {IsString, IsOptional, IsInt, IsDate, IsDateString, Matches } from 'class-validator'

export class CreatePersonaDto{

    @IsString()
    @IsOptional()
    nombre?: string

    @IsString()
    @IsOptional()
    apellido_pat?: string

    @IsString()
    @IsOptional()
    apellido_mat?: string

    @IsInt()
    @IsOptional()
    sexo?: number

    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'La fecha debe estar en formato YYYY-MM-DD',
    })
    @IsOptional()
    fecha_nac?: string; 

    @IsString()
    @IsOptional()
    curp?: string

    @IsString()
    @IsOptional()
    rfc?: string

    @IsInt()
    @IsOptional()
    activo?: number
} 
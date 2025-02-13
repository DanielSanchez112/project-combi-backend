import {IsString, IsOptional, IsInt } from 'class-validator'

export class CreateTipoUsuarioDto{
    @IsString()
    @IsOptional()
    nombre?: string

    @IsString()
    @IsOptional()
    descripcion?: string

    @IsInt()
    @IsOptional()
    activo?: number
} 
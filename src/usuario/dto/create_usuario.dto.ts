import { Type } from 'class-transformer';
import {IsString, IsOptional, IsInt, ValidateNested } from 'class-validator'
import { CreatePersonaDto } from 'src/persona/dto/create_persona.dto';

export class CreateUsuarioDto {
    @IsString()
    @IsOptional()
    usuario: string;

    @IsString()
    @IsOptional()
    contrasena: string;
    
    @IsString()
    @IsOptional()
    correo: string;
    
    @IsInt()
    @IsOptional()
    id_tipo_usuario: number;
    
    @IsInt()
    @IsOptional()
    activo: number;
    
    // Datos de persona
    @ValidateNested()
    @Type(() => CreatePersonaDto)
    persona: CreatePersonaDto;
  }
import { Type } from 'class-transformer';
import {IsString, IsOptional, IsInt, ValidateNested, IsEmail, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator'
import { CreatePersonaDto } from 'src/persona/dto/create_persona.dto';

export class CreateUsuarioDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
    @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
    @MaxLength(20, { message: 'El nombre de usuario no puede superar los 20 caracteres' })
    usuario: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    @MaxLength(30, { message: 'La contraseña no puede superar los 30 caracteres' })
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
      message: 'La contraseña debe tener al menos una mayúscula, un número y un carácter especial',
    })
    contrasena: string;
    
    @IsString()
    @IsOptional()
    @IsNotEmpty({ message: 'El correo es obligatorio' })
    @IsEmail({}, { message: 'El correo debe ser válido' })
    @MaxLength(50, { message: 'El correo no puede superar los 50 caracteres' })
    correo: string;
    
    @IsInt()
    @IsOptional()
    @IsNotEmpty({ message: 'El tipo de usuario es obligatorio' })
    id_tipo_usuario: number;
    
    @IsInt()
    @IsOptional()
    activo: number;
    
    // Datos de persona
    @ValidateNested()
    @Type(() => CreatePersonaDto)
    persona: CreatePersonaDto;
  }
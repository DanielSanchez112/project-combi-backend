import {IsString, IsOptional, IsNotEmpty, MinLength, MaxLength } from 'class-validator'
  
  export class LoginDto{
  
      @IsString()
      @IsOptional()
      @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
      @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
      @MaxLength(20, { message: 'El nombre de usuario no puede superar los 20 caracteres' })
      usuario?: string
  
      @IsString()
      @IsOptional()
      @IsNotEmpty({ message: 'La contraseña es obligatoria' })
      @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
      @MaxLength(30, { message: 'La contraseña no puede superar los 30 caracteres' })
      contrasena?: string
  } 


  
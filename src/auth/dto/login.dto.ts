import {IsString, IsOptional } from 'class-validator'
  
  export class LoginDto{
  
      @IsString()
      @IsOptional()
      usuario?: string
  
      @IsString()
      @IsOptional()
      contrasena?: string
  
  } 
  
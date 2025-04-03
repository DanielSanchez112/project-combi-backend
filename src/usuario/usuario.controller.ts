import { Controller, Post, Body, Get, ParseIntPipe, Param, Req, UsePipes, ValidationPipe, UseInterceptors, UseFilters } from '@nestjs/common';
import { UsuariosService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create_usuario.dto';
import { SuccessInterceptor } from 'src/SI';

@Controller('usuarios')
@UseInterceptors(SuccessInterceptor)
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true })) 
    create(@Req() request: Request, @Body() createUsuarioDto: CreateUsuarioDto) {
      // console.log('🔥 Datos recibidos:', JSON.stringify(createUsuarioDto, null, 2))
      // console.log('Request:', request);
      // console.log('Body:', createUsuarioDto);
      return this.usuariosService.create(createUsuarioDto);
  }

    @Get()
    findAll() {
      return this.usuariosService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.usuariosService.findOne(id);
    }
}
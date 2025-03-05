import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseFilters, UseInterceptors ,} from '@nestjs/common'
import { TipoUsuarioService } from './tipo_usuario.service';
import { CreateTipoUsuarioDto } from './dto/create_tipo_usuario.dto';
import { UpdateTipoUsuarioDto } from './dto/update_tipo_usuario.dto';
import { GlobalExceptionFilter } from 'src/GEF';
import { SuccessInterceptor } from 'src/SI';

@Controller('tipo_usuario')
@UseFilters(new GlobalExceptionFilter())
@UseInterceptors(SuccessInterceptor)
export class TipoUsuarioController {
    constructor(private readonly tipoUsuarioService: TipoUsuarioService) {}

    @Post()
    create(@Body() createTipoUsuario: CreateTipoUsuarioDto) {
        console.log(createTipoUsuario)
        if (createTipoUsuario.descripcion == null) {
            throw new Error('La descripción es requerida')
        } 
        return this.tipoUsuarioService.create(createTipoUsuario)
    }

    @Get()
    findAll(){
        if (this.tipoUsuarioService.findAll() == null) {
            throw new Error('No hay registros')
        }
        return this.tipoUsuarioService.findAll()
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.tipoUsuarioService.finfOne(id)
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body()updateTipoUsuario: UpdateTipoUsuarioDto 
    ){
        return this.tipoUsuarioService.update(id, updateTipoUsuario)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number){
        return this.tipoUsuarioService.remove(id)
    }
}





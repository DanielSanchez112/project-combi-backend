import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe ,} from '@nestjs/common'
import { TipoUsuarioService } from './tipo_usuario.service';
import { CreateTipoUsuarioDto } from './dto/create_tipo_usuario.dto';
import { UpdateTipoUsuarioDto } from './dto/update_tipo_usuario.dto';

@Controller('tipo_usuario')
export class TipoUsuarioController {
    constructor(private readonly tipoUsuarioService: TipoUsuarioService) {}

    @Post()
    create(@Body() createTipoUsuario: CreateTipoUsuarioDto) {
        return this.tipoUsuarioService.create(createTipoUsuario)
    }

    @Get()
    findAll(){
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
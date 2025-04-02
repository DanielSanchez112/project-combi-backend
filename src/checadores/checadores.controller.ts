import { Controller, Post, Body, Get, Delete, Patch, Param,UseFilters, UseInterceptors } from "@nestjs/common";
import { ChecadorService } from "./checadores.service";
import { CreateChecadorDto } from "./dto/create_checador.dto";
import { SuccessInterceptor } from "src/SI";

@Controller('checadores')
@UseInterceptors(SuccessInterceptor)
export class ChecadoresController{
    constructor(private readonly checadoresService: ChecadorService) {}

    //crear checador
    @Post()
    create(@Body() createChecador: CreateChecadorDto){
        if ( createChecador.id_usuario == null){
            throw new Error('El id del checador y del usuario son requeridos')
        }else{
            return this.checadoresService.create(createChecador)
        }
    }

    //buscar todos los checadores
    @Get()
    fidneAll(){
        if (this.checadoresService.findAll() == null) {
            throw new Error('No hay registros')
        }else{
            return this.checadoresService.findAll()
        }
    }

    //buscar checador mediante id
    @Get(":id")
    findOne(@Param("id") id: number){
        if (this.checadoresService.findOne(id) == null){
            throw new Error('No hay registros')
        }else{
            return this.checadoresService.findOne(id)
        }
    }

    //update checador
    @Patch(':id')
    update(
        @Param('id') id: number,
        @Body() updateChecador: CreateChecadorDto
    ){
        return this.checadoresService.update(id, updateChecador)
    }

    //eliminar checador
    @Delete(':id')
    remove(@Param("id") id: number){
        if (this.checadoresService.remove(id) == null){
            throw new Error('No hay registros')
        }else{
            return this.checadoresService.remove(id)
        }
    }
}
import { Controller, Post, Body, Get, Delete, Patch, Param,UseFilters, UseInterceptors } from "@nestjs/common";
import { SuccessInterceptor } from "src/SI";
import { RutasService } from "./rutas.service";
import { CreateRutasDto } from "./dto/create_rutas.dto";

@Controller('rutas')
@UseInterceptors(SuccessInterceptor)
export class RutasController{
    constructor(private readonly rutasService: RutasService) {}

    //crear ruta
    @Post()
    create(@Body() createRutas: CreateRutasDto){
        return this.rutasService.create(createRutas)
    }

    //buscar todas las rutas
    @Get()
    fidneAll(){
        if (this.rutasService.findAll() == null) {
            throw new Error('No hay registros')
        }else{
            return this.rutasService.findAll()
        }
    }

    //buscar ruta mediante id
    @Get(":id")
    findOne(@Param("id") id: number){
        if (this.rutasService.findOne(id) == null){
            throw new Error('No hay registros')
        }else{
            return this.rutasService.findOne(id)
        }
    }

    //update ruta
    @Patch(':id')
    update(
        @Param('id') id: number,
        @Body() updateRutas: CreateRutasDto
    ){
        return this.rutasService.update(id, updateRutas)
    }

    //eliminar ruta
    @Delete(':id')
    remove(@Param("id") id: number){
        if (this.rutasService.remove(id) == null){
            throw new Error('No hay registros')
        }else{
            return this.rutasService.remove(id)
        }
    }
}
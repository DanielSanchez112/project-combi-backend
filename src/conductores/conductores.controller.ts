
import { Controller, Post, Body, Get, Delete, Patch, Param,UseFilters, UseInterceptors } from "@nestjs/common";
import { ConductoresService } from './conductores.service';
import { CreateConductoresDto } from './dto/create_conductores.dto';
import { GlobalExceptionFilter } from "src/GEF";
import { SuccessInterceptor } from "src/SI";


@Controller('conductores')
@UseFilters(new GlobalExceptionFilter())
@UseInterceptors(SuccessInterceptor)
export class ConductoresController {
    constructor (private readonly conductoresService: ConductoresService) {}

    //crear conductor
    @Post()
    create(@Body() createConductor: CreateConductoresDto){
        if (createConductor.id_usuario == null){
            throw new Error('El id del conductor y del usuario son requeridos')
        }else{
            return this.conductoresService.create(createConductor)
        }
    }

    //buscar todos los conductores
    @Get()
    findAll(){
        if (this.conductoresService.findAll() == null){
            throw new Error('No hay registros')
        }else{
            return this.conductoresService.findAll()
        }
    }

    //buscar conductor mediante id
    @Get(":id")
    findOne(@Param("id") id: number){
        if (this.conductoresService.findOne(id) == null){
            throw new Error('No hay registros')
        }else{
            return this.conductoresService.findOne(id)
        }
    }

    //actualizar conductor
    @Patch(':id')
    update(
        @Param('id') id: number,
        @Body() updateConductor: CreateConductoresDto
    ){
        return this.conductoresService.update(id, updateConductor)
    }

    //eliminar conductor
    @Delete(':id')
    remove(@Param("id") id: number){
        if (this.conductoresService.remove(id) == null){
            throw new Error('No hay registros')
        }else{
            return this.conductoresService.remove(id)
        }
    }

}
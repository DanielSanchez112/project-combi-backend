import { Controller, Post, Body, Get, Delete, Patch, Param,UseFilters, UseInterceptors } from "@nestjs/common";
import { ParadasService } from "./paradas.service";
import { SuccessInterceptor } from "src/SI";

@Controller('paradas')
@UseInterceptors(SuccessInterceptor)
export class ParadasController{
    constructor(private paradasService: ParadasService) {}

    //crear parada
    @Post()
    create(@Body() createParada){
        return this.paradasService.create(createParada)
    }

    //buscar todas las paradas
    @Get()
    findAll(){
        return this.paradasService.findAll()
    }

    //buscar parada mediante id
    @Get(":id")
    findOne(@Param("id") id: number){
        return this.paradasService.findOne(id)
    }

    //actualizar parada
    @Patch(':id')
    update(
        @Param('id') id: number,
        @Body() updateParada
    ){
        return this.paradasService.update(id, updateParada)
    }

    //eliminar parada
    @Delete(':id')
    remove(@Param("id") id: number){
        return this.paradasService.remove(id)
    }
}
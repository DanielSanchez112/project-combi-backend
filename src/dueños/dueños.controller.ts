import { Controller, Post, Body, Get, Delete, Patch, Param} from "@nestjs/common";
import { DuenoService } from "./dueños.service";
import { CreateDueñoDto } from "./dto/create_dueño.dto";


@Controller('duenos')
export class DuenoController{
    constructor(private readonly duenoService: DuenoService) {}

    //crear dueño
    @Post()
    create(@Body() createDueno: CreateDueñoDto){
        if ( createDueno.id_usuario == null){
            throw new Error('El id del dueño y del usuario son requeridos')
        }else{
            return this.duenoService.create(createDueno)
        }
    }

    //buscar todos los dueños
    @Get()
    fidneAll(){
        if (this.duenoService.findAll() == null) {
            throw new Error('No hay registros')
        }else{
            return this.duenoService.findAll()
        }
    }

    //buscar dueño mediante id
    @Get(":id")
    findOne(@Param("id") id: number){
        if (this.duenoService.findOne(id) == null){
            throw new Error('No hay registros')
        }else{
            return this.duenoService.findOne(id)
        }
    }

    //update dueño
    @Patch(':id')
    update(
        @Param('id') id: number,
        @Body() updateDueño: CreateDueñoDto
    ){
        return this.duenoService.update(id, updateDueño)
    }

    //eliminar dueño
    @Delete(':id')
    remove(@Param("id") id: number){
        if (this.duenoService.remove(id) == null){
            throw new Error('No hay registros')
        }else{
            return this.duenoService.remove(id)
        }
    }

}
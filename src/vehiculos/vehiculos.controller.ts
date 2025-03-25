import { Controller, Post, Body, Get, Delete, Patch, Param,UseFilters, UseInterceptors } from "@nestjs/common";
import { VehiculosService } from './vehiculos.service'
import { SuccessInterceptor } from "src/SI";
import { CreateVehiculoDto } from './dto/create_vehiculo.dto'
import { UpdateVehiculoDto } from "./dto/update_vehiculo.dto";

@Controller('vehiculos')
@UseInterceptors(SuccessInterceptor)
export class VehiculosController {
    constructor(private readonly vehiculosService: VehiculosService) {}

    //crear vehiculo
    @Post()
    create(@Body() createVehiculo: CreateVehiculoDto){
        if ( createVehiculo.id_dueno == null){
            throw new Error('El id del dueño es requerido')
        }else{
            return this.vehiculosService.create(createVehiculo)
        }
    }

    //buscar todos los vehiculos
    @Get()
    findAll(){
        if (this.vehiculosService.findAll() == null) {
            throw new Error('No hay registros')
        }else{
            return this.vehiculosService.findAll()
        }
    }

    //buscar vehiculo mediante id
    @Get(":id")
    findOne(@Param("id") id: number){
        if (this.vehiculosService.findOne(id) == null){
            throw new Error('No hay registros')
        }else{
            return this.vehiculosService.findOne(id)
        }
    }

    //update vehiculo
    @Patch(':id')
    update(
        @Param('id') id: number,
        @Body() updateVehiculo: UpdateVehiculoDto
    ){
        return this.vehiculosService.update(id, updateVehiculo)
    }

    //eliminar vehiculo
    @Delete(':id')
    remove(@Param("id") id: number){
        if (this.vehiculosService.remove(id) == null){
            throw new Error('No hay registros')
        }else{
            return this.vehiculosService.remove(id)
        }
    }

    //buscar vehiculos por dueño
    @Get('dueno/:id')
    findByOwner(@Param('id') id: number){
        return this.vehiculosService.findByOwner(id)
    }

    //buscar vehiculo por numero
    @Get('numero/:numero')
    findByNumber(@Param('numero') numero: string){
        return this.vehiculosService.findByNumber(numero)
    }

    //buscar vehiculos por matricula
    @Get('matricula/:matricula')
    findByMatricula(@Param('matricula') matricula: string){
        return this.vehiculosService.findByMatricula(matricula)
    }

    
}
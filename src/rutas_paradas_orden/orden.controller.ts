// src/rutas-paradas-orden/rutas-paradas-orden.controller.ts
import { Controller, Post, Body, Get, Delete, Patch, Param,UseFilters, UseInterceptors, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { OrdenService } from './orden.service';
import { CreateRutaConOrdenDto } from './dto/create_orden.dto';
import { SuccessInterceptor } from "src/SI";

@Controller('rutas-paradas-orden')
@UseInterceptors(SuccessInterceptor)
export class OrdenController {
    constructor(private readonly ordenService: OrdenService) {}

    @Post()
    create(@Body() createRutaConOrdenDto: CreateRutaConOrdenDto) {
      return this.ordenService.create(createRutaConOrdenDto);
    }
  
    @Get()
    findAll() {
      return this.ordenService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.ordenService.findOne(+id);
    }
  
    @Get(':id/paradas')
    getRutaConParadas(@Param('id') id: string) {
      return this.ordenService.getRutaConParadas(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRutaConOrdenDto: CreateRutaConOrdenDto) {
      return this.ordenService.update(+id, updateRutaConOrdenDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.ordenService.remove(+id);
    }

}

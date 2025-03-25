// src/rutas-paradas-orden/rutas-paradas-orden.controller.ts
import { Controller, Post, Body, Get, Delete, Patch, Param,UseFilters, UseInterceptors } from "@nestjs/common";
import { OrdenService } from './orden.service';
import { CreateRutaConOrdenDto } from './dto/create_orden.dto';
import { SuccessInterceptor } from "src/SI";

@Controller('rutas-paradas-orden')
@UseInterceptors(SuccessInterceptor)
export class OrdenController {
    constructor(private readonly ordenService: OrdenService) {}

    @Post()
    async crearRuta(@Body() createRutaConOrden: CreateRutaConOrdenDto) {
      return this.ordenService.create(createRutaConOrden);
    }
}

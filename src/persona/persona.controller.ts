import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe ,} from '@nestjs/common'
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create_persona.dto';
import { UpdatePersonaDto } from './dto/update_persona.dto';

@Controller('persona')
export class PersonaController {
    constructor(private readonly personaService: PersonaService) {}

    @Post()
    create(@Body() createPersona: CreatePersonaDto) {
        return this.personaService.create(createPersona)
    }

    @Get()
    findAll(){
        return this.personaService.findAll()
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.personaService.finfOne(id)
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body()updatePersona: UpdatePersonaDto 
    ){
        return this.personaService.update(id, updatePersona)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number){
        return this.personaService.remove(id)
    }
}
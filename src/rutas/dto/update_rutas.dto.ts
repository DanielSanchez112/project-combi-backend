import { PartialType } from '@nestjs/mapped-types';
import { CreateRutasDto } from './create_rutas.dto';

export class UpdateRutasDto extends PartialType(CreateRutasDto) {}
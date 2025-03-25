import { PartialType } from '@nestjs/mapped-types';
import { CreateParadaDto } from './create_parada.dto';

export class UpdateParadaDto extends PartialType(CreateParadaDto) {}
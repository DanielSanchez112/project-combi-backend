import { PartialType } from '@nestjs/mapped-types';
import { CreateVehiculoDto } from './create_vehiculo.dto';

export class UpdateVehiculoDto extends PartialType(CreateVehiculoDto) {}
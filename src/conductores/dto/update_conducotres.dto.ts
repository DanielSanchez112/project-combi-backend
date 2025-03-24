import { PartialType } from '@nestjs/mapped-types';
import { CreateConductoresDto } from './create_conductores.dto';

export class UpdateConductoresDto extends PartialType(CreateConductoresDto) {}
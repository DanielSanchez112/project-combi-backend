import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdenDto } from './create_orden.dto';

export class UpdateOrdenDto extends PartialType(CreateOrdenDto) {}
import { PartialType } from '@nestjs/mapped-types';
import { CreateChecadorDto } from './create_checador.dto';

export class UpdateChecadorDto extends PartialType(CreateChecadorDto) {}
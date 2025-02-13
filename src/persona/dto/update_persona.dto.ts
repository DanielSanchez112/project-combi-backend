import { PartialType } from '@nestjs/mapped-types'
import { CreatePersonaDto } from './create_persona.dto'

export class UpdatePersonaDto extends PartialType(CreatePersonaDto) {}
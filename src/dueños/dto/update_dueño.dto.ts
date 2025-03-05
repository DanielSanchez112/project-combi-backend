import {PartialType} from "@nestjs/mapped-types"
import {CreateDueñoDto} from "./create_dueño.dto"

export class UpdateDueñoDto extends PartialType(CreateDueñoDto) {}
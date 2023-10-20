import { PartialType } from '@nestjs/mapped-types';
import { CreateEntrantDto } from './create-entrant.dto';

export class UpdateEntrantDto extends PartialType(CreateEntrantDto) {}

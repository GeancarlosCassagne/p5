import { PartialType } from '@nestjs/mapped-types';
import { CreateGasolineDto } from './create-gasoline.dto';

export class UpdateGasolineDto extends PartialType(CreateGasolineDto) {}

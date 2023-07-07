import {
  IsString,
  MinLength,
  IsInt,
  IsPositive,
  IsNotEmpty,
} from 'class-validator';

export class CreateGasolineDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  price: number;
}

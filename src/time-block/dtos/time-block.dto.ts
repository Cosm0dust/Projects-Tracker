import { IsEnum, IsString, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class TimeBlockDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsNumber()
  duration: string;

  @IsNumber()
  @IsOptional()
  order: number;
}

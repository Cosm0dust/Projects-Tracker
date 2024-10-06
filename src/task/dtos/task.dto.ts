import { IsEnum, IsString, IsBoolean, IsOptional } from 'class-validator';
import { PriorityEnum } from '../../common/types/enums';
import { Transform } from 'class-transformer';

export class TaskDto {
  @IsString()
  name: string;

  @IsEnum(PriorityEnum)
  @Transform(({value}) => ('' + value).toLowerCase().trim() )
  @IsOptional() 
  priority?: PriorityEnum = PriorityEnum.Low;

  @IsBoolean()
  @IsOptional() 
  isCompleted?: boolean = false;

  @IsString()
  userId: string;
}

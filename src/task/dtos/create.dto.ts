import { IsString } from 'class-validator';
import { TaskDto } from './task.dto';

export class CreateTaskDto extends TaskDto {
  @IsString()
  userId: string;
}
import { Controller, Get, Post, Put, Delete, Param, Body, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dtos/create.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Auth()
  @Get()
  async getAllTasks(@CurrentUser('id') userId: string): Promise<Task[]> {
    return this.taskService.getAll(userId);
  }

  @Auth()
  @Post()
  async createTask(@CurrentUser('id') userId: string, @Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto, userId);
  }

  @Auth()
  @Put(':id')
  async updateTask(
    @Param('id') taskId: string,
    @Body() updateTaskDto: Partial<CreateTaskDto>, 
    @CurrentUser('id') userId: string,
  ): Promise<Task> {
    return this.taskService.update(updateTaskDto, taskId, userId);
  }

  @Auth()
  @Delete(':taskId')
  async deleteTask(@Param('taskId') taskId: string): Promise<void> {
    return this.taskService.delete(taskId);
  }
}

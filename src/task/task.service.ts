import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { MoreThan, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { startOfDay, subDays } from 'date-fns';
import { TaskDto } from './dtos/task.dto';
import { connect } from 'http2';
import { CreateTaskDto } from './dtos/create.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) {}

    async getAll(userId: string) {
        return this.taskRepository.find({
            where: {
                userId
            }
        })
    }

    async create(dto: CreateTaskDto, userId: string): Promise<Task> {
        const newTask = this.taskRepository.create({
          ...dto,
          userId, 
        });
      
        return this.taskRepository.save(newTask);
      }

      async update(dto: Partial<CreateTaskDto>, taskId: string, userId: string): Promise<Task> {
        const existingTask = await this.taskRepository.findOne({ where: { id: taskId, userId } });
      
        if (!existingTask) {
          throw new Error('Task not found or you do not have permission to update this task');
        }

        const updatedTask = this.taskRepository.merge(existingTask, dto);
      
        return this.taskRepository.save(updatedTask);
      }

      async delete(taskId: string): Promise<void> {
        const deleteResult = await this.taskRepository.delete({ id: taskId });
      
        if (deleteResult.affected === 0) {
          throw new Error('Task not found or could not be deleted');
        }
      }

    async getProfileStatistics(profile: Omit<User, 'password'>): Promise<{ statistics: { total: number; completedTasks: number; todayTasks: number; weekTasks: number } }> {
        const totalTasks = await this.taskRepository.count({
            where: { userId: profile.id },
        });

        const completedTasks = await this.taskRepository.count({
            where: {
                userId: profile.id,
                isCompleted: true,
            },
        });

        const todayStart = startOfDay(new Date());
        const weekStart = startOfDay(subDays(new Date(), 7));

        const todayTasks = await this.taskRepository.count({
            where: {
                userId: profile.id,
                createdAt: MoreThan(todayStart),
            },
        });

        const weekTasks = await this.taskRepository.count({
            where: {
                userId: profile.id,
                createdAt: MoreThan(weekStart),
            },
        });

        return {
            statistics: {
                total: totalTasks,
                completedTasks: completedTasks,
                todayTasks: todayTasks,
                weekTasks: weekTasks,
            },
        };
    }
}

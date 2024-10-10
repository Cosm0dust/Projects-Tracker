import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeBlock } from './time-block.entity';
import { TimeBlockDto } from './dtos/time-block.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';

@Injectable()
export class TimeBlockService {
    constructor(
        @InjectRepository(TimeBlock)
        private timeBlockRepository: Repository<TimeBlock>
    ) {}

    async getAll(userId: string) {
        return this.timeBlockRepository.find({
            where: {
                userId
            },
            order: {
                order: 'ASC',
            
            }
        })
    } 

    async create(dto: TimeBlockDto, userId: string): Promise<TimeBlock> {
        const newTimeBlock = this.timeBlockRepository.create({
          ...dto,
          userId, 
        });
      
        return this.timeBlockRepository.save(newTimeBlock);
      }

      async update(dto: Partial<TimeBlockDto>, timeBlockId: string, userId: string): Promise<TimeBlock> {
        const existingTimeBlock = await this.timeBlockRepository.findOne({ where: { id: timeBlockId, userId } });
      
        if (!existingTimeBlock) {
          throw new Error('TimeBlock not found or you do not have permission to update this TimeBlock');
        }

        const updatedTimeBlock = this.timeBlockRepository.merge(existingTimeBlock, dto);
      
        return this.timeBlockRepository.save(updatedTimeBlock);
      }

      async delete(timeBlockId: string): Promise<void> {
        const deleteResult = await this.timeBlockRepository.delete({ id: timeBlockId });
      
        if (deleteResult.affected === 0) {
          throw new Error('TimeBlock not found or could not be deleted');
        }
      }

      async updateOrder(idsDto:  Partial<UpdateOrderDto>): Promise<TimeBlock[]> {
        const connection = this.timeBlockRepository.manager.connection;
        const {ids} = idsDto

        return await connection.transaction(async (entityManager) => {
            const updatedTimeBlocks = [];
            for (const [index, id] of ids.entries()) {
                const updatedTimeBlock = await entityManager.update(TimeBlock, id, { order: index });
                updatedTimeBlocks.push(updatedTimeBlock);
            }
            return updatedTimeBlocks;
        });
    }
}

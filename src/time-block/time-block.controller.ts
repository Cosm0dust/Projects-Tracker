import { Controller, Get, Post, Put, Delete, Param, Body, Req, UseGuards } from '@nestjs/common';
import { TimeBlockService } from './time-block.service';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { TimeBlock } from './time-block.entity';
import { TimeBlockDto } from './dtos/time-block.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';

@Controller('time-blocks')
export class TimeBlockController {
  constructor(private readonly timeBlockService: TimeBlockService) {}

  @Auth()
  @Get()
  async getAllTimeBlocks(@CurrentUser('id') userId: string): Promise<TimeBlock[]> {
    return this.timeBlockService.getAll(userId);
  }

  @Auth()
  @Post()
  async createTimeBlock(@CurrentUser('id') userId: string, @Body() createTimeBlockDto: TimeBlockDto): Promise<TimeBlock> {
    return this.timeBlockService.create(createTimeBlockDto, userId);
  }

  @Auth()
  @Put(':id')
  async updateTimeBlock(
    @Param('id') timeBlockId: string,
    @Body() updateTimeBlockDto: Partial<TimeBlockDto>, 
    @CurrentUser('id') userId: string,
  ): Promise<TimeBlock> {
    return this.timeBlockService.update(updateTimeBlockDto, timeBlockId, userId);
  }

  @Auth()
  @Put('update-oreder')
  async updateOrder(
    @Body() updateOrderDto: Partial<UpdateOrderDto>, 
    @CurrentUser('id') userId: string,
  ) {
    return this.timeBlockService.updateOrder(updateOrderDto);
  }

  @Auth()
  @Delete(':timeBlockId')
  async deleteTimeBlock(@Param('timeBlockId') timeBlockId: string): Promise<void> {
    return this.timeBlockService.delete(timeBlockId);
  }
}

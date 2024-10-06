// task.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeBlockService } from './time-block.service';
import { TimeBlockController } from './time-block.controller';
import { TimeBlock } from './time-block.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimeBlock])],
  providers: [TimeBlockService],
  controllers: [TimeBlockController],
  exports: [TimeBlockService], 
})
export class TimeBlockModule {}

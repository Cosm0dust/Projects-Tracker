import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeBlock } from './time-block.entity';

@Injectable()
export class TimeBlockService {
    constructor(
        @InjectRepository(TimeBlock)
        private timeBlockRepository: Repository<TimeBlock>
    ) {}
}

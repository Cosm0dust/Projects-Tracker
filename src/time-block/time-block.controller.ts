import { Controller, Get, Post, Put, Delete, Param, Body, Req, UseGuards } from '@nestjs/common';
import { TimeBlockService } from './time-block.service';

@Controller('time-blocks')
export class TimeBlockController {
  constructor(private readonly taskService: TimeBlockService) {}

}

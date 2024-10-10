import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, Request, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { TimerService } from './timer.service';
import { TimerRound } from './timer-round.entity';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';

@Controller('timer')
export class TimerController {
    constructor(private readonly timerService: TimerService) {}

    @Get('today')
    @Auth()
    async getTodaySession(@CurrentUser('id') userId: string) {
        return this.timerService.getTodaySession(userId);
    }

    @HttpCode(200)
    @Post()
    @Auth()
    async createSession(@CurrentUser('id') userId: string) {
        return this.timerService.create(userId);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Put('rounds/:roundId')
    async updateRound(
        @Param('roundId', ParseUUIDPipe) roundId: string,
        @Body() dto: Partial<TimerRound>
    ) {
        return this.timerService.updateRound(dto, roundId);
    }

    @UsePipes(new ValidationPipe())
    @Delete(':sessionId')
    async deleteSession(
        @CurrentUser('id') userId: string,
        @Param('sessionId', ParseUUIDPipe) sessionId: string,
    ) {
        return this.timerService.deleteSession(sessionId, userId);
    }
}


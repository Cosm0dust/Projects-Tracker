import { Module } from '@nestjs/common';
import { PomodoroRoundController } from './pomodoro-round.controller';
import { PomodoroRoundService } from './pomodoro-round.service';

@Module({
  controllers: [PomodoroRoundController],
  providers: [PomodoroRoundService]
})
export class PomodoroRoundModule {}

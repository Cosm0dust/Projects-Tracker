import { Module } from '@nestjs/common';
import { PomodoroSessionController } from './pomodoro-session.controller';
import { PomodoroSessionService } from './pomodoro-session.service';

@Module({
  controllers: [PomodoroSessionController],
  providers: [PomodoroSessionService]
})
export class PomodoroSessionModule {}

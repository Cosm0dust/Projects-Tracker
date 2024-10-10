import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { PomodoroSessionModule } from './pomodoro-session/pomodoro-session.module';
import { PomodoroRoundModule } from './pomodoro-round/pomodoro-round.module';
import { AuthModule } from './auth/auth.module';
import dataSource from './data-source/data-source';
import { TimeBlockModule } from './time-block/time-block.module';
import { TimerModule } from './timer/timer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dataSource],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => 
        configService.get('typeorm'), 
    }),
    UserModule,
    TaskModule,
    PomodoroSessionModule,
    PomodoroRoundModule,
    AuthModule,
    TimeBlockModule,
    TimerModule
  ],
})
export class AppModule {}



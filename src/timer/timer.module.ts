import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimerService } from './timer.service';
import { TimerController } from './timer.controller';
import { TimerSession } from './timer-session.entity';
import { TimerRound } from './timer-round.entity';
import { UserModule } from '../user/user.module'; // Adjust the path accordingly

@Module({
    imports: [
        TypeOrmModule.forFeature([TimerSession, TimerRound]),
        UserModule,
    ],
    controllers: [TimerController],
    providers: [TimerService],
})
export class TimerModule {}

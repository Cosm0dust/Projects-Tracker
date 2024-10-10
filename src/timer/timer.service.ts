import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TimerSession } from "./timer-session.entity";
import { MoreThan, Repository } from "typeorm";
import { TimerRound } from "./timer-round.entity";
import { UserService } from "../user/user.service";


@Injectable()
export class TimerService {
    constructor(
        @InjectRepository(TimerSession)
        private timerSessionRepository: Repository<TimerSession>,
        @InjectRepository(TimerRound)
        private timerRoundRepository: Repository<TimerRound>,
        private userService: UserService 
    ) {}

    async getTodaySession(userId: string) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return this.timerSessionRepository.findOne({
            where: {
                user: { id: userId },
                createdAt: MoreThan(today),
            },
            order: {
                createdAt: 'ASC',
                timerRounds: {
                    id: 'DESC',
                },
            },
            relations: ['timerRounds'],
        });
    }

    async create(userId: string) {
        const todaySession = await this.getTodaySession(userId);
        if (todaySession) return todaySession;

        const user = await this.userService.getUserIntervalCounts(userId);

        if (!user) {
            throw new Error('User not found');
        }

        const newSession = this.timerSessionRepository.create({
            user: { id: userId }, 
        });

        const savedSession = await this.timerSessionRepository.save(newSession);

        const rounds = Array.from({ length: user.intervalsCount }, () => ({
            totalSeconds: 0,
            session: savedSession,
        }));

        await this.timerRoundRepository.save(rounds);

        return this.timerSessionRepository.findOne({
            where: { id: savedSession.id },
            relations: ['timerRounds'],
        });
    }

    async updateRound(dto: Partial<TimerRound>, roundId: string) {
        const result = await this.timerRoundRepository.update(roundId, dto);
    
        if (result.affected === 0) {
            throw new Error('Round not found');
        }
    
        return result;
    }

    async deleteSession(sessionId: string, userId: string) {
        const result = await this.timerSessionRepository.delete({
            id: sessionId,
            user: { id: userId }, 
        });
    
        if (result.affected === 0) {
            throw new Error('Session not found or does not belong to the user');
        }
        return result;
    }
}




import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TimerSession } from './timer-session.entity';
import { BasicColumns } from '../common/entityFragments/baseEntity.entity';


@Entity('timer_round')
export class TimerRound extends BasicColumns {

  @Column({default: false, name: 'is_complited'})
  isCompleted: boolean 

  @Column({
    name: 'total_seconds',
    default: 0,
  })
  totalSeconds: number

  @ManyToOne(() =>  TimerSession, (timerSession) => timerSession.timerRounds, { onDelete: 'CASCADE' })
  timerSession:  TimerSession;

  @Column({ name: 'timer_session_id' })
  timerSessionId: number;
}
import { Entity, Column,  ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { BasicColumns } from '../common/entityFragments/baseEntity.entity';
import { TimerRound } from './timer-round.entity';


@Entity('timer_session')
export class TimerSession extends BasicColumns {

  @Column({default: false, name: 'is_complited'})
  isCompleted: boolean 

  @ManyToOne(() => User, (user) => user.timeBlocks)
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @OneToMany(() => TimerRound, (timerRound) => timerRound.timerSession, { onDelete: 'CASCADE' })
  timerRounds: TimerRound[];
}
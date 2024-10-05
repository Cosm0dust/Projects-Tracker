import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { PomodoroRound } from '../pomodoro-round/pomodoro-round.entity';
import { BasicColumns } from '../common/entityFragments/baseEntity.entity';


@Entity('pomodoro_session')
export class PomodoroSession extends BasicColumns {

  @Column({default: false, name: 'is_complited'})
  isCompleted: boolean 

  @ManyToOne(() => User, (user) => user.timeBlocks)
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @OneToMany(() => PomodoroRound, (pomodoroRound) => pomodoroRound.pomodoroSession, { onDelete: 'CASCADE' })
  pomodoroRounds: PomodoroRound[];
}
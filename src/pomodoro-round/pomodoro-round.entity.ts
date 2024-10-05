import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { PomodoroSession } from '../pomodoro-session/pomodoro-session.entity';
import { BasicColumns } from '../common/entityFragments/baseEntity.entity';


@Entity('pomodoro_round')
export class PomodoroRound extends BasicColumns {

  @Column({default: false, name: 'is_complited'})
  isCompleted: boolean 

  @Column({
    name: 'total_seconds',
    default: 0,
  })
  totalSeconds: number

  @ManyToOne(() => PomodoroSession, (pomodoroSession) => pomodoroSession.pomodoroRounds, { onDelete: 'CASCADE' })
  pomodoroSession: PomodoroSession;

  @Column({ name: 'pomodoro_session_id' })
  pomodoroSessionId: number;
}
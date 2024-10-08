import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../task/task.entity';
import { TimerSession } from '../timer/timer-session.entity';
import { BasicColumns } from '../common/entityFragments/baseEntity.entity';
import { TimeBlock } from '../time-block/time-block.entity';

@Entity('user')
export class User extends BasicColumns {
  @Column({nullable: true, default: ''})
  username?: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({name: 'work_interval',default: 50})
  workInterval?: number

  @Column({name: 'break_interval',default: 10})
  breakInterval:  number

  @Column({name: 'intervals_count', default: 7})
  intervalsCount: number

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToMany(() => TimeBlock, (timeBlock) => timeBlock.user)
  timeBlocks: TimeBlock[];

  @OneToMany(() => TimerSession, (timerSession) => timerSession.user)
  timerSessions: TimerSession[];

}
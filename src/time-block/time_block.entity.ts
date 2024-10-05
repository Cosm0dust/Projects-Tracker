import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { BasicColumns } from '../common/entityFragments/baseEntity.entity';


@Entity('time_block')
export class TimeBlock extends BasicColumns {

  @Column()
  name?: string;

  @Column()
  color?: string;

  @Column({ unique: true })
  duration: number;

  @Column({default: 1})
  order?: number

  @ManyToOne(() => User, (user) => user.timeBlocks, { onDelete: 'CASCADE' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

}
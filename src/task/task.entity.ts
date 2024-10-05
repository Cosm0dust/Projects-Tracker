import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PriorityEnum } from '../common/types/enums';
import { User } from '../user/user.entity';
import { BasicColumns } from '../common/entityFragments/baseEntity.entity';

@Entity('task')
export class Task extends BasicColumns {
  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: PriorityEnum,
    default: PriorityEnum.Low,
  })
  priority: PriorityEnum;

  @Column({ default: false, name: 'is_completed' })
  isCompleted: boolean;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @Column({ name: 'user_id' })
  userId: string;
}

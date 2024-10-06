import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity'; 
import { AuthDto } from '../auth/dto/auth.dto';
import { hash } from 'argon2';
import { UserDto } from './user.dto';
import { TaskService } from '../task/task.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private taskService: TaskService,

    ) {}

    async getById(id: string): Promise<User | null> {
        return this.userRepository.findOne({
            where: { id },
            relations: ['tasks'],
        });
    }

    async getByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOneBy({ email });
    }

    async create(dto: AuthDto): Promise<User> {
        const hashedPassword = await hash(dto.password);
        const user = this.userRepository.create({
            ...dto,
            password: hashedPassword,
        });

        return this.userRepository.save(user);
    }

    async update(id: string, dto: UserDto): Promise<Omit<User, 'password'> > {
        let updateData = { ...dto };

        if (dto.password) {
            const hashedPassword = await hash(dto.password);
            updateData.password = hashedPassword;
        }

        await this.userRepository.update(id, updateData);

        const {password, ...rest} =  await this.getById(dto.id)
        return rest;
    }

    async getProfile(id: string): Promise<{ user: Omit<User, 'password'> }> {
        if (!id || typeof id !== 'string' || id.trim() === '') {
            throw new BadRequestException('Invalid user ID');
        }
    
        const profile = await this.getById(id);
    
        if (!profile) {
            throw new NotFoundException('User not found');
        }
    
        const { password, ...rest } = profile;
    
        return {
            user: rest,
        };
    }

    async getProfileWithStatistics(id: string) {
        const {user}= await this.getProfile(id)
        const {statistics}= await this.taskService.getProfileStatistics(user)

        return {
            user,
            statistics
        }
    }
}




import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from '../auth/dto/auth.dto';
import passport = require('passport');
import { hash } from 'argon2';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
     ) { }

    getById(id: string) {
        return this.userRepository.findOne({
            where: { id },
            relations: ['tasks'],
        });
    }

    getByEmail(email: string){
        return this.userRepository.findOneBy({email})
    }

    async create(dto: AuthDto){
    const hashedPassword = await hash(dto.password);
    const user = this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    return this.userRepository.save(user); 
    }
}

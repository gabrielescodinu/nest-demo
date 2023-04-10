import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(user: Partial<User>): Promise<User> {
        const existingUser = await this.findOneByEmail(user.email);
        if (existingUser) {
            throw new BadRequestException('Email already in use.');
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = this.userRepository.create({
            ...user,
            password: hashedPassword,
        });

        return await this.userRepository.save(newUser);
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email } });
    }


    //... altri metodi per gestire gli utenti
}

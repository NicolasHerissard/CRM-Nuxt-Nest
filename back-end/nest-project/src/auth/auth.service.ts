/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth)
        private authRepository: Repository<Auth>,
    ) {}

    async register(username: string, password: string, email: string): Promise<Auth> {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = this.authRepository.create({ username, password: hashPassword, email });
        return this.authRepository.save(newUser);
    }

    async login(username: string, password: string): Promise<Auth> {
        
        const user = await this.authRepository.findOne({ where: { username } })
        if(!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            throw new Error('Invalid password');
        }

        return user;
    }
}

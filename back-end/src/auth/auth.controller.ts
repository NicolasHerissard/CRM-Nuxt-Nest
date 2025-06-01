/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService,
    ) {}

    @Post('register')
    @HttpCode(201)
    async register(@Body() body: { username: string; password: string; email: string }) {
        return this.authService.register(body.username, body.password, body.email);
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() body: { username: string; password: string }, @Res({passthrough: true}) res: Response) {
        
        const user = await this.authService.login(body.username, body.password);

        const payload = { username: user.username, id: user.id };
        const token = this.jwtService.sign(payload, { expiresIn: '30m' });

        res.cookie('auth_token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 30 * 60 * 1000, // 30min
            secure: true,
        })

        return { message: 'Login successful', user };
    }

    @Get('cookie')
    @UseGuards(JwtAuthGuard)
    async getCookie(@Req() req: any, @Res({ passthrough: true }) res: any) {
        const payload = { username: req.user.username, id: req.user.id }
        const newToken = this.jwtService.sign(payload, { expiresIn: '30m' })

        res.cookie('auth_token', newToken, {
            httpOnly: true,
            maxAge: 30 * 60 * 1000, // 30min
            sameSite: 'lax',
        })

        return req.user
    }
}

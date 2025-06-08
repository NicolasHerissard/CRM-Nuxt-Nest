/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { HistoriqueConnexionService } from './historique-connexion.service';
import { HistoriqueConnexion } from './historique-connexion.entity';

@Controller('historique-connexion')
export class HistoriqueConnexionController {
    constructor(
        private historiqueConnexionService: HistoriqueConnexionService,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createHistoriqueConnexion(@Body() body: { date: Date, ip_address: string, userAgent: string, device: string, os: string, browser: string, authId: number }): Promise<HistoriqueConnexion> {
        return this.historiqueConnexionService.createHistoriqueConnexion(body.date, body.ip_address, body.userAgent, body.device, body.os, body.browser, body.authId);
    }

    @Get('/count')
    @HttpCode(HttpStatus.OK)
    async findHistoryByAuthId(@Body() body: { authId: number }): Promise<number> {
        return this.historiqueConnexionService.findCountHistoryByAuthId(body.authId);
    }

    @Get('/count/month')
    @HttpCode(HttpStatus.OK)
    async findHistoryByDate(@Query('month') month: string, @Query('authId') authId: number): Promise<number> {
        return this.historiqueConnexionService.findCountHistoryByDate(month, authId);
    }
}

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HistoriqueConnexion } from './historique-connexion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/auth/auth.entity';

@Injectable()
export class HistoriqueConnexionService {
    constructor(
        @InjectRepository(HistoriqueConnexion)
        private historiqueConnexionRepository: Repository<HistoriqueConnexion>,

        @InjectRepository(Auth)
        private authRepository: Repository<Auth>,
    ) {}

    async createHistoriqueConnexion(date: Date, ip_address: string, userAgent: string, device: string, os: string, browser: string, authId: number): Promise<HistoriqueConnexion> {
        const auth = await this.authRepository.findOne({where: {id: authId}});
        const newHistoriqueConnexion = this.historiqueConnexionRepository.create({ date, ip_address, userAgent, device, os, browser, auth });
        return this.historiqueConnexionRepository.save(newHistoriqueConnexion);
    }

    async findCountHistoryByAuthId(authId: number): Promise<number> {
        return this.historiqueConnexionRepository.count({where: {auth: {id: authId}}});
    }

    async findCountHistoryByDate(month: string, authId: number): Promise<number> {
        return this.historiqueConnexionRepository.createQueryBuilder('historiqueConnexion')
            .where('MONTH(historiqueConnexion.date) = :month', { month })
            .andWhere('historiqueConnexion.auth.id = :authId', { authId })
            .getCount();
    }
}

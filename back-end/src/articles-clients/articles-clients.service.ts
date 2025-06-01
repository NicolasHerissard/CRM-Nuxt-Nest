/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticlesClients } from './articles-clients.entity';
import { Between, Repository } from 'typeorm';
import { Articles } from 'src/articles/articles.entity';
import { Clients } from 'src/clients/clients.entity';

@Injectable()
export class ArticlesClientsService {
    constructor(
        @InjectRepository(ArticlesClients)
        private articlesClientsRepository: Repository<ArticlesClients>,
        
        @InjectRepository(Articles)
        private articlesRepository: Repository<Articles>,

        @InjectRepository(Clients)
        private clientsRepository: Repository<Clients>,    
    ) {}

    public async getArticlesByClientId(clientId: number): Promise<ArticlesClients[]> {
        return await this.articlesClientsRepository.find({
            where: { client: { id: clientId } },
            relations: ['article', 'client'],
        })
    }

    public async getClientsByArticleId(articleId: number): Promise<ArticlesClients[]> {
        return await this.articlesClientsRepository.find({
            where: { article: { id: articleId } },
            relations: ['client', 'article'],
        })
    }

    public async createClientArticles(
    clientId: number,
    articles: { articleId: number; quantity: number }[],
    ): Promise<ArticlesClients[]> {
    const client = await this.clientsRepository.findOne({ where: { id: clientId } });
    if (!client) throw new Error('Client not found');

    const savedRelations: ArticlesClients[] = [];

    for (const { articleId, quantity } of articles) {
        const article = await this.articlesRepository.findOne({ where: { id: articleId } });
        if (!article) {
        throw new Error(`Article with ID ${articleId} not found`);
        }

        const relation = this.articlesClientsRepository.create({
        client,
        article,
        quantity,
        });

        const saved = await this.articlesClientsRepository.save(relation);
        savedRelations.push(saved);
    }

    return savedRelations;
    }

    public async countArticlesByClientId(clientId: number): Promise<number> {
        const count = await this.articlesClientsRepository.count({
            where: { client: { id: clientId } },
        });
        return count;
    }

    public async getArticlesClientsByDateByClientId(clientId: number, date: Date): Promise<Articles[]> {
        
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);

        const end = new Date(date);
        end.setHours(23, 59, 59, 999);
        
        const result = await this.articlesClientsRepository.find({
            where: { client: { id: clientId }, created_at: Between(start, end) },
            relations: ['article', 'client'],
        });

        return result.map((r) => r.article)
    }
}

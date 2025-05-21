/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticlesClients } from './articles-clients.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticlesClientsService {
    constructor(
        @InjectRepository(ArticlesClients)
        private articlesClientsRepository: Repository<ArticlesClients>
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

    public async createClientArticle(clientId: number, articleId: number): Promise<ArticlesClients> {
        const article = await this.articlesClientsRepository.findOne({ where: { id: articleId } });
        const client = await this.articlesClientsRepository.findOne({ where: { id: clientId } });
        if(!article || !client) {
            throw new Error('Article or Client not found');
        }

        const articleClient = this.articlesClientsRepository.save({ client: client, article: article });
        return articleClient;
    }

    public async countArticlesByClientId(clientId: number): Promise<number> {
        const count = await this.articlesClientsRepository.count({
            where: { client: { id: clientId } },
        });
        return count;
    }
}

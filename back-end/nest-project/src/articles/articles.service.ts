/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Articles } from './articles.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Articles)
        private articlesRepository: Repository<Articles>
    ) {}

    public async findAll(): Promise<Articles[]> {
        return await this.articlesRepository.find();
    }

    public async createArticle(article: Articles): Promise<Articles> {
        return await this.articlesRepository.save(article);
    }

    public async findByName(name: string): Promise<Articles[]> {
        return await this.articlesRepository.createQueryBuilder('articles')
            .where('articles.name LIKE :name', { name: `%${name}%` })
            .getMany();
    }

    public async findByPrice(price: number): Promise<Articles[]> {
        return await this.articlesRepository.createQueryBuilder('articles')
            .where('articles.price = :price', { price })
            .getMany();
    }

    public async deleteArticle(id: number): Promise<void> {
        await this.articlesRepository.delete(id);
    }

    public async updateArticle(id: number, article: Articles): Promise<Articles> {
        await this.articlesRepository.update(id, article);
        return this.articlesRepository.findOneBy({ id });
    }
}

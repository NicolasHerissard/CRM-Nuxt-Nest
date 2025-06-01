/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { ArticlesClientsService } from './articles-clients.service';

@Controller('articles-clients')
export class ArticlesClientsController {
    constructor(
        private articlesClientsService: ArticlesClientsService
    ) {}

    @Get('client/articles/:id')
    @HttpCode(200)
    public async getArticlesByClientId(@Param('id') clientId: number) {
        return this.articlesClientsService.getArticlesByClientId(clientId);
    }

    @Get('articles/:id')
    @HttpCode(200)
    public async getClientsByArticleId(@Param('id') articleId: number) {
        return this.articlesClientsService.getClientsByArticleId(articleId);
    }

    @Post()
    @HttpCode(201)
    public async createArticleClient(@Body() body: { clientId: number; articles: { articleId: number; quantity: number }[] }) {
        return this.articlesClientsService.createClientArticles(body.clientId, body.articles);
    }

    @Get('count/:id')
    @HttpCode(200)
    public async countArticlesByClientId(@Param('id') clientId: number) {
        return this.articlesClientsService.countArticlesByClientId(clientId);
    }

    @Get('clients')
    @HttpCode(200)
    public async getArticlesClientsByDateByClientId(@Query('id') clientId: number, @Query('date') date: Date) {
        return this.articlesClientsService.getArticlesClientsByDateByClientId(clientId, date);
    }
}

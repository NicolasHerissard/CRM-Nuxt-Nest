/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ArticlesClientsService } from './articles-clients.service';

@Controller('articles-clients')
export class ArticlesClientsController {
    constructor(
        private articlesClientsService: ArticlesClientsService
    ) {}

    @Get('client/:id')
    @HttpCode(200)
    public async getArticlesByClientId(@Param('id') clientId: number) {
        return this.articlesClientsService.getArticlesByClientId(clientId);
    }

    @Get('article/:id')
    @HttpCode(200)
    public async getClientsByArticleId(@Param('id') articleId: number) {
        return this.articlesClientsService.getClientsByArticleId(articleId);
    }

    @Post()
    @HttpCode(201)
    public async createArticleClient(@Body() body: { clientId: number; articleId: number }) {
        return this.articlesClientsService.createClientArticle(body.clientId, body.articleId);
    }

    @Get('count/:id')
    @HttpCode(200)
    public async countArticlesByClientId(@Param('id') clientId: number) {
        return this.articlesClientsService.countArticlesByClientId(clientId);
    }
}

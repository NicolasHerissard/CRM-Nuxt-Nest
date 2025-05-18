/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Articles } from './articles.entity';

@Controller('articles')
export class ArticlesController {
    constructor(
        private articlesService: ArticlesService
    ) {}

    @Get()
    @HttpCode(200)
    async findAll(): Promise<Articles[]> {
        return this.articlesService.findAll();
    }

    @Post()
    @HttpCode(201)
    async createArticle(@Body() article: Articles): Promise<Articles> {
        return this.articlesService.createArticle(article);
    }

    @Get('search')
    @HttpCode(200)
    async findByName(@Query('name') name: string): Promise<Articles[]> {
        return this.articlesService.findByName(name);
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteArticle(@Param('id') id: number): Promise<void> {
        return this.articlesService.deleteArticle(id);
    }

    @Put(':id')
    @HttpCode(200)
    async updateArticle(@Param('id') id: number, @Body() article: Articles): Promise<Articles> {
        return this.articlesService.updateArticle(id, article);
    }
}

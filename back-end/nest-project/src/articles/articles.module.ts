/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articles } from './articles.entity';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Articles]),
    ],
    providers: [ArticlesService],
    exports: [ArticlesService],
    controllers: [ArticlesController],
})
export class ArticlesModule {}

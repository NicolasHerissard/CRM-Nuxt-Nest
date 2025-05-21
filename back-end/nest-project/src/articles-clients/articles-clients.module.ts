/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesClients } from './articles-clients.entity';
import { ArticlesClientsController } from './articles-clients.controller';
import { ArticlesClientsService } from './articles-clients.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ArticlesClients]),
    ],
    controllers: [ArticlesClientsController],
    providers: [ArticlesClientsService],
    exports: [ArticlesClientsService],
})
export class ArticlesClientsModule {}

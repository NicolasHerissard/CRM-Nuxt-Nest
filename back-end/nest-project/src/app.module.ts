/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'admin',
      database: 'crm',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      
    }),
    ClientsModule,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private dataSource: DataSource
  ) {}
}

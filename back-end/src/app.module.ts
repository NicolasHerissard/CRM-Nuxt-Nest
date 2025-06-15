/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ArticlesModule } from './articles/articles.module';
import { ArticlesClientsModule } from './articles-clients/articles-clients.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HistoriqueConnexionModule } from './historique-connexion/historique-connexion.module';
import { FacturesModule } from './factures/factures.module';
import { DevisModule } from './devis/devis.module';
import { DevisItemsModule } from './devis-items/devis-items.module';
import { RateLimitMiddleware } from './rate-limit/rate-limit.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    ClientsModule,
    ArticlesModule,
    ArticlesClientsModule,
    AppointmentsModule,
    AuthModule,
    HistoriqueConnexionModule,
    FacturesModule,
    DevisModule,
    DevisItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(
    private dataSource: DataSource
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RateLimitMiddleware)
      .forRoutes('*');
  }
}

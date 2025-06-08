/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HistoriqueConnexionService } from './historique-connexion.service';
import { HistoriqueConnexionController } from './historique-connexion.controller';
import { HistoriqueConnexion } from './historique-connexion.entity';
import { Auth } from 'src/auth/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HistoriqueConnexion, Auth])],
  exports: [HistoriqueConnexionService],
  providers: [HistoriqueConnexionService],
  controllers: [HistoriqueConnexionController]
})
export class HistoriqueConnexionModule {}

import { Module } from '@nestjs/common';
import { DevisItemsService } from './devis-items.service';
import { DevisItemsController } from './devis-items.controller';

@Module({
  providers: [DevisItemsService],
  controllers: [DevisItemsController]
})
export class DevisItemsModule {}

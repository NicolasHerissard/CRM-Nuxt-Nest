import { Test, TestingModule } from '@nestjs/testing';
import { DevisItemsController } from './devis-items.controller';

describe('DevisItemsController', () => {
  let controller: DevisItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevisItemsController],
    }).compile();

    controller = module.get<DevisItemsController>(DevisItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

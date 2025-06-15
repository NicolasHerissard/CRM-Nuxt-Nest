import { Test, TestingModule } from '@nestjs/testing';
import { DevisItemsService } from './devis-items.service';

describe('DevisItemsService', () => {
  let service: DevisItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevisItemsService],
    }).compile();

    service = module.get<DevisItemsService>(DevisItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

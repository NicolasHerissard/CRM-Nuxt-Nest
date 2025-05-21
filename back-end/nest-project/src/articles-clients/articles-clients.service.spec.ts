import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesClientsService } from './articles-clients.service';

describe('ArticlesClientsService', () => {
  let service: ArticlesClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticlesClientsService],
    }).compile();

    service = module.get<ArticlesClientsService>(ArticlesClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

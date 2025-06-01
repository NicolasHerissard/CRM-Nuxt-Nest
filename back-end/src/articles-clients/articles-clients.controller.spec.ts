import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesClientsController } from './articles-clients.controller';

describe('ArticlesClientsController', () => {
  let controller: ArticlesClientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesClientsController],
    }).compile();

    controller = module.get<ArticlesClientsController>(ArticlesClientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

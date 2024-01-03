import { Test, TestingModule } from '@nestjs/testing';
import { MongoCoffeesController } from './mongo-coffees.controller';

describe('MongoCoffeesController', () => {
  let controller: MongoCoffeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MongoCoffeesController],
    }).compile();

    controller = module.get<MongoCoffeesController>(MongoCoffeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

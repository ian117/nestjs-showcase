import { Test, TestingModule } from '@nestjs/testing';
import { MongoCoffeesService } from './mongo-coffees.service';

describe('MongoCoffeesService', () => {
  let service: MongoCoffeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoCoffeesService],
    }).compile();

    service = module.get<MongoCoffeesService>(MongoCoffeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

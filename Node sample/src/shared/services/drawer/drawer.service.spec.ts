import { Test, TestingModule } from '@nestjs/testing';
import { DrawerService } from './drawer.service';

describe('DrawerService', () => {
  let service: DrawerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrawerService],
    }).compile();

    service = module.get<DrawerService>(DrawerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

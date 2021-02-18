import { Test, TestingModule } from '@nestjs/testing';
import { DrawerTypeService } from './drawer-type.service';

describe('DrawerTypeService', () => {
  let service: DrawerTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrawerTypeService],
    }).compile();

    service = module.get<DrawerTypeService>(DrawerTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

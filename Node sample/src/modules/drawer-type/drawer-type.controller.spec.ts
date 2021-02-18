import { Test, TestingModule } from '@nestjs/testing';
import { DrawerTypeController } from './drawer-type.controller';

describe('Drawer Controller', () => {
  let controller: DrawerTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrawerTypeController],
    }).compile();

    controller = module.get<DrawerTypeController>(DrawerTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

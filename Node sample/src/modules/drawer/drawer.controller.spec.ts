import { Test, TestingModule } from '@nestjs/testing';
import { DrawerController } from './drawer.controller';

describe('Drawer Controller', () => {
  let controller: DrawerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrawerController],
    }).compile();

    controller = module.get<DrawerController>(DrawerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

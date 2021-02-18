import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { DrawerController } from './drawer.controller';

@Module({
    controllers: [DrawerController],
    imports: [
      SharedModule,
    ]
  })
export class DrawerModule {}
import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { DrawerTypeController } from './drawer-type.controller';

@Module({
    controllers: [DrawerTypeController],
    imports: [
      SharedModule,
    ]
  })
export class DrawerTypeModule {}
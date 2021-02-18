import { Module, DynamicModule } from '@nestjs/common';
import { SportTypeResolver } from './sport-type.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportType } from './sport-type.entity';
import { SportTypeService } from '../shared/service/sport-type.service';
import { SharedModule } from '../shared/shared.module';

const providers = [
  SportTypeService,
  SportTypeResolver
];


@Module({
  imports:[
    SharedModule,
    TypeOrmModule.forFeature([SportType]),
  ],
})
export class SportTypeModule {
  static forRoot(): DynamicModule {
    return {
      module: SportTypeModule,
      providers: providers,
      exports: providers,
    };
  }
}

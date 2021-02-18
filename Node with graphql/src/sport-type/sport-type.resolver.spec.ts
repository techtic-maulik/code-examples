import { Test, TestingModule } from '@nestjs/testing';
import { SportTypeResolver } from './sport-type.resolver';

describe('SportTypeResolver', () => {
  let resolver: SportTypeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SportTypeResolver],
    }).compile();

    resolver = module.get<SportTypeResolver>(SportTypeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

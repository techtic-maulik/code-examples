import { Module, DynamicModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiAuthGuard, AdminAuthGuard } from './auth.guard';

let providers = [
  AuthService,
  JwtStrategy,
  ApiAuthGuard,
  AdminAuthGuard
]

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60 days' },
      
    }),
  ],
  providers: providers,
  exports: providers,
})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
      //providers: providers,
      //exports: providers,
    };
  }
}

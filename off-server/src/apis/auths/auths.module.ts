import { CacheModule, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { JwtGoogleStrategy } from 'src/commons/auth/jwt-social-google.strategy';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthsResolver } from './auths.resolver';
import { AuthsService } from './auths.service';
import { Token } from './entities/token.entity';

@Module({
  imports: [
    JwtModule.register({}),
    CacheModule.register(),
    TypeOrmModule.forFeature([Token, User]),
  ],
  providers: [
    AuthsResolver, //
    AuthsService,
    UsersService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtService,
    JwtGoogleStrategy,
  ],
  controllers: [
    AuthController, //
  ]
})
export class AuthsModule {}

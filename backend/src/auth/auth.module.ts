import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { FacebookStrategy } from './facebook.strategy';
import { LinkedInStrategy } from './linkedin.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { User } from './auth/repositories/user/user';
import { User } from './repositories/user/user';

@Module({
  imports: [ConfigModule.forRoot(), PassportModule],
  providers: [AuthService, GoogleStrategy, FacebookStrategy, 
LinkedInStrategy, User],
  controllers: [AuthController],
})
export class AuthModule {}


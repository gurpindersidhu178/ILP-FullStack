import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 
'facebook') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('FACEBOOK_CLIENT_ID'),
      clientSecret: configService.get<string>('FACEBOOK_CLIENT_SECRET'),
      callbackURL: 
`${configService.get<string>('CALLBACK_URL')}/facebook/callback`,
      profileFields: ['emails', 'name'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, 
done: VerifyCallback): Promise<any> {
    const user = {
      email: profile.emails ? profile.emails[0].value : '',
      name: `${profile.name.givenName} ${profile.name.familyName}`,
      provider: 'facebook',
      providerId: profile.id,
    };
    done(null, user);
  }
}


import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-linkedin-oauth2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, 
'linkedin') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('LINKEDIN_CLIENT_ID'),
      clientSecret: configService.get<string>('LINKEDIN_CLIENT_SECRET'),
      callbackURL: 
`${configService.get<string>('CALLBACK_URL')}/linkedin/callback`,
      scope: ['r_emailaddress', 'r_liteprofile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, 
done: Function): Promise<any> {
    const user = {
      email: profile.emails[0].value,
      name: profile.displayName,
      provider: 'linkedin',
      providerId: profile.id,
    };
    done(null, user);
  }
}


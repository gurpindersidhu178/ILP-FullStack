import { 
  Controller, Get, Post, Req, Body, UseGuards, BadRequestException 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ✅ Test API Route
  @Get('test')
  testAPI() {
    return { message: "Auth API is working!" };
  }

  // ✅ Register a new user
  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required.');
    }
    return this.authService.register(email, password);
  }

  // ✅ Login with email & password (Returns JWT Token)
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    const token = await this.authService.validateUser(email, password);
    if (!token) {
      throw new BadRequestException('Invalid credentials.');
    }
    return { message: 'Login successful', token };
  }

  // ✅ Google Authentication
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return req.user;
  }

  // ✅ Facebook Authentication
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  facebookAuth() {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  facebookAuthRedirect(@Req() req) {
    return req.user;
  }

  // ✅ LinkedIn Authentication
  @Get('linkedin')
  @UseGuards(AuthGuard('linkedin'))
  linkedinAuth() {}

  @Get('linkedin/callback')
  @UseGuards(AuthGuard('linkedin'))
  linkedinAuthRedirect(@Req() req) {
    return req.user;
  }
}


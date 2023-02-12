import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.signup();
  }

  @Post('login')
  async login() {
    return await this.authService.login();
  }

  @Post('refresh')
  async refresh() {
    return await this.authService.refresh();
  }
}

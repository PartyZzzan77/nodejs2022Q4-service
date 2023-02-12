import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AddUserDto } from '../users/dto/add-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() createAuthDto: AddUserDto) {
    return await this.authService.signup(createAuthDto);
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

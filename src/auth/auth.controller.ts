import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  ForbiddenException,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AddUserDto } from '../users/dto/add-user.dto';
import { User } from '../users/Entities/user.entitie';
import { Constants } from '../constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() createAuthDto: AddUserDto): Promise<User> {
    return await this.authService.signup(createAuthDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async login(@Body() loginDto: AddUserDto) {
    const user = await this.authService.getUser(loginDto);

    if (!user) {
      throw new ForbiddenException(Constants.USER_INVALID);
    }

    return await this.authService.generateJWT(user);
  }

  @Post('refresh')
  async refresh() {
    return await this.authService.refresh();
  }
}

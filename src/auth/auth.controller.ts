import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  ForbiddenException,
  HttpCode,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AddUserDto } from '../users/dto/add-user.dto';
import { User } from '../users/Entities/user.entitie';
import { Constants } from '../constants';
import { Tokens } from './types/tokens.interface';
import { TokenDto } from './dto/token.dto';

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
  async login(@Body() loginDto: AddUserDto): Promise<Tokens> {
    const user = await this.authService.getUser(loginDto);

    if (!user) {
      throw new ForbiddenException(Constants.USER_INVALID);
    }

    return await this.authService.generateJWT(user);
  }

  @Post('refresh')
  @UsePipes(
    new ValidationPipe({
      exceptionFactory: () => {
        return new UnauthorizedException();
      },
    }),
  )
  @HttpCode(200)
  async refresh(@Body() dto: TokenDto) {
    const result = await this.authService.refresh(dto.refreshToken);

    if (!result) {
      throw new ForbiddenException();
    }

    return result;
  }
}

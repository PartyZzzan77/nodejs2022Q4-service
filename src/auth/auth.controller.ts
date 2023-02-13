import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  ForbiddenException,
  HttpCode,
  UnauthorizedException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AddUserDto } from '../users/dto/add-user.dto';
import { BadRequestUUID, Invalid, User } from '../users/Entities/user.entitie';
import { Constants } from '../constants';
import { Tokens } from './types/tokens.interface';
import { TokenDto } from './dto/token.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Auth, Unauthorized } from './Entities/auth.entitie';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: AddUserDto })
  @ApiCreatedResponse({
    status: 201,
    type: User,
    description: 'The user has been created.',
  })
  @ApiBadRequestResponse({
    type: BadRequestUUID,
    description: 'no login or password, or they are not a strings',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() createAuthDto: AddUserDto): Promise<User> {
    return await this.authService.signup(createAuthDto);
  }

  @ApiOperation({ summary: 'Access tokens and updates must be received' })
  @ApiResponse({
    status: 200,
    type: Auth,
    description: 'Access tokens and updates must be received',
  })
  @ApiBody({ type: AddUserDto })
  @ApiBadRequestResponse({
    type: BadRequestUUID,
    description: 'no login or password, or they are not a strings',
  })
  @ApiForbiddenResponse({
    type: Invalid,
    description:
      "no user with such login, password doesn't match actual one, etc.",
  })
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

  @ApiOperation({
    summary: 'To get new pair of Access token and Refresh token',
  })
  @ApiResponse({
    status: 200,
    type: Auth,
    description: 'Access tokens and updates must be received',
  })
  @ApiBody({ type: TokenDto })
  @ApiUnauthorizedResponse({
    type: Unauthorized,
    description: 'no refreshToken in body',
  })
  @ApiForbiddenResponse({
    type: Invalid,
    description: 'Refresh token is invalid or expired',
  })
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

import {
  Controller,
  Get,
  Param,
  Body,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  NotFoundException,
  Post,
  HttpCode,
  Put,
  ForbiddenException,
  BadRequestException,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  BadRequestUUID,
  Invalid,
  NotFound,
  RequiredToken,
  User,
} from './Entities/user.entitie';
import { UsersService } from './users.service';
import { AddUserDto } from './dto/add-user.dto';
import { UserIdDto } from './dto/user-id.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Constants } from '../constants';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { isUUID } from 'class-validator';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('user')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard)
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: 'Gets all users' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiUnauthorizedResponse({
    type: RequiredToken,
    description: 'Access token is missing or invalid',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async find(): Promise<User[]> {
    return await this.usersService.find();
  }

  @ApiOperation({ summary: 'Get single user by id' })
  @ApiResponse({ status: 200, type: User, description: 'Successful operation' })
  @ApiBadRequestResponse({
    type: BadRequestUUID,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ type: NotFound, description: 'User not found' })
  @ApiUnauthorizedResponse({
    type: RequiredToken,
    description: 'Access token is missing or invalid',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    if (!isUUID(id, 4)) {
      throw new BadRequestException(Constants.ID_ERROR);
    }

    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException(Constants.USER_ERROR);
    }
    return user;
  }
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: AddUserDto })
  @ApiCreatedResponse({
    status: 201,
    type: User,
    description: 'The user has been created.',
  })
  @ApiBadRequestResponse({
    type: BadRequestUUID,
    description: 'Bad request. body does not contain required fields',
  })
  @ApiUnauthorizedResponse({
    type: RequiredToken,
    description: 'Access token is missing or invalid',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: AddUserDto): Promise<User> {
    return await this.usersService.create(dto);
  }

  @ApiOperation({ summary: `Updates a user\'s password by ID` })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    type: User,
    description: 'The user has been updated.',
  })
  @ApiBadRequestResponse({
    type: BadRequestUUID,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiForbiddenResponse({ type: Invalid, description: 'oldPassowrd is wrong' })
  @ApiNotFoundResponse({ type: NotFound, description: 'User not found' })
  @ApiUnauthorizedResponse({
    type: RequiredToken,
    description: 'Access token is missing or invalid',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param() { id }: UserIdDto,
    @Body() dto: UpdateUserDto,
  ): Promise<User | string> {
    const result = await this.usersService.update({ id, dto });

    if (result === Constants.USER_ERROR) {
      throw new NotFoundException(Constants.USER_ERROR);
    } else if (result === Constants.USER_INVALID) {
      throw new ForbiddenException(Constants.USER_INVALID);
    }

    return result;
  }

  @ApiOperation({ summary: `Deletes user` })
  @ApiResponse({
    status: 204,
    description: 'The user has been deleted',
  })
  @ApiBadRequestResponse({
    type: BadRequestUUID,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiForbiddenResponse({ type: Invalid, description: 'oldPassowrd is wrong' })
  @ApiNotFoundResponse({ type: NotFound, description: 'User not found' })
  @ApiUnauthorizedResponse({
    type: RequiredToken,
    description: 'Access token is missing or invalid',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @HttpCode(204)
  async delete(@Param() { id }: UserIdDto): Promise<void> {
    const result = await this.usersService.delete(id);

    if (!result) {
      throw new NotFoundException(Constants.USER_ERROR);
    }
  }
}

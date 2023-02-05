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
} from '@nestjs/common';
import {
  BadRequestUUID,
  Invalid,
  NotFound,
  User,
} from './Entities/user.entitie';
import { UsersService } from './users.service';
import { AddUserDto } from './dto/add-user.dto';
import { UserIdDto } from './dto/user-id.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Constants } from '../constants';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: 'Gets all users' })
  @ApiResponse({ status: 200, type: [User] })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  find() {
    return this.usersService.find('users');
  }

  @ApiOperation({ summary: 'Get single user by id' })
  @ApiResponse({ status: 200, type: User, description: 'Successful operation' })
  @ApiBadRequestResponse({
    type: BadRequestUUID,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ type: NotFound, description: 'User not found' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param() { id }: UserIdDto) {
    const user = this.usersService.findOne({ key: 'users', id });
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
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() dto: AddUserDto): Partial<User> {
    return this.usersService.create({ key: 'users', dto });
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
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  update(@Param() { id }: UserIdDto, @Body() dto: UpdateUserDto) {
    const result = this.usersService.update({ key: 'users', id, dto });
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
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  @HttpCode(204)
  delete(@Param() { id }: UserIdDto) {
    const result = this.usersService.delete({ key: 'users', id });
    if (!result) {
      throw new NotFoundException(Constants.USER_ERROR);
    }
  }
}

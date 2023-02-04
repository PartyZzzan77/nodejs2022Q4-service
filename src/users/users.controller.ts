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
import { User } from './Entities/user.entitie';
import { UsersService } from './users.service';
import { AddUserDto } from './dto/add-user.dto';
import { UserIdDto } from './dto/user-id.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Constants } from '../constants';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  find() {
    return this.usersService.find('users');
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param() { id }: UserIdDto) {
    const user = this.usersService.findOne({ key: 'users', id });
    if (!user) {
      throw new NotFoundException(Constants.USER_ERROR);
    }
    return user;
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() dto: AddUserDto): Partial<User> {
    return this.usersService.create({ key: 'users', dto });
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  @HttpCode(204)
  delete(@Param() { id }: UserIdDto) {
    const result = this.usersService.delete({ key: 'users', id });
    if (!result) {
      throw new NotFoundException(Constants.USER_ERROR);
    }
  }
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
}

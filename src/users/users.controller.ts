import {
  Controller,
  Get,
  Put,
  Param,
  Post,
  Body,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ResponseUser, User } from './Entities/user.entitie';
import { UsersService } from './users.service';
import { AddUserDto } from './dto/add-user.dto';
import { UserIdDto } from './dto/user-id.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAllUsers(): Omit<User, 'password'>[] {
    return this.usersService.getAllUsers();
  }
  @Get(':id')
  getOneUser(@Param() userId: UserIdDto): ResponseUser {
    return this.usersService.getOneUser(userId.id);
  }
  @Post()
  addUser(@Body() userData: AddUserDto): ResponseUser {
    return this.usersService.addUser(userData);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param() userId: UserIdDto) {
    return this.usersService.deleteUser(userId.id);
  }
  @Put(':id')
  updateUser(
    @Param() userId: UserIdDto,
    @Body() updateUserData: UpdateUserDto,
  ): ResponseUser {
    return this.usersService.updateUser(userId.id, updateUserData);
  }
}

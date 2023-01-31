import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { User } from './Entities/user.entitie';
import { UsersService } from './users.service';
import { AddUserDto } from './dto/add-user.dto';
import { UserIdDto } from './dto/user-id.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAllUsers(): User[] {
    return this.usersService.getAllUsers();
  }
  @Get(':id')
  getOneUser(@Param() userId: UserIdDto): User {
    return this.usersService.getOneUser(userId.id);
  }
  @Post()
  addUser(@Body() userData: AddUserDto): Omit<User, 'password'> {
    return this.usersService.addUser(userData);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param() userId: UserIdDto) {
    return this.usersService.deleteUser(userId.id);
  }
}

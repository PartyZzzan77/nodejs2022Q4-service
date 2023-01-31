import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { User } from './Entities/user.entitie';
import { UsersService } from './users.service';
import { AddUserDto } from './dto/add-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAllUsers(): User[] {
    return this.usersService.getAllUsers();
  }
  @Get(':id')
  getOneUser(@Param('id') id: string): User {
    return this.usersService.getOneUser(id);
  }
  @Post()
  addUser(@Body() userData: AddUserDto): Omit<User, 'password'> {
    return this.usersService.addUser(userData);
  }
}

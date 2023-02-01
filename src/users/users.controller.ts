import {
  Controller,
  Get,
  Put,
  Param,
  Post,
  Body,
  Delete,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { User } from './Entities/user.entitie';
import { UsersService } from './users.service';
import { AddUserDto } from './dto/add-user.dto';
import { UserIdDto } from './dto/user-id.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAllUsers(): User[] {
    return this.usersService.getAllUsers();
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getOneUser(@Param() userId: UserIdDto): User {
    return this.usersService.getOneUser(userId.id);
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  addUser(@Body() userData: AddUserDto): User {
    return this.usersService.addUser(userData);
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param() userId: UserIdDto): void {
    return this.usersService.deleteUser(userId.id);
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  updateUser(
    @Param() userId: UserIdDto,
    @Body() updateUserData: UpdateUserDto,
  ): User {
    return this.usersService.updateUser(userId.id, updateUserData);
  }
}

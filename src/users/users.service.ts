import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './Entities/user.entitie';
import { AddUserDto } from './dto/add-user.dto';
import { v4 as uuid4 } from 'uuid';
import { Constants } from '../constants';

@Injectable()
export class UsersService {
  users: User[] = [];
  getAllUsers(): User[] {
    return this.users;
  }
  getOneUser(id: string): User {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(Constants.USER_ERROR);
    }

    return user;
  }
  addUser(userData: AddUserDto): Omit<User, 'password'> {
    const stamp = Date.now();
    const newUser = {
      id: uuid4(),
      createdAt: stamp,
      updatedAt: stamp,
      version: 1,
      ...userData,
    };

    this.users.push(newUser);
    delete newUser.password;

    return newUser;
  }
}

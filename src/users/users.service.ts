import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './Entities/user.entitie';
import { AddUserDto } from './dto/add-user.dto';
import { v4 as uuid4 } from 'uuid';
import { Constants } from '../constants';
import { UpdateUserDto } from './dto/update-user.dto';
import { cleanUpEntity } from '../utils/helpers';

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
  addUser(userData: AddUserDto) {
    const stamp = Date.now();
    const newUser = {
      id: uuid4(),
      createdAt: stamp,
      updatedAt: stamp,
      version: 1,
      ...userData,
    };

    this.users.push(newUser);

    return cleanUpEntity(newUser);
  }
  deleteUser(id: string) {
    this.getOneUser(id);
    this.users = this.users.filter((user) => user.id !== id);
  }
  updateUser(id: string, updateUserData: UpdateUserDto) {
    const user = this.getOneUser(id);

    if (user.password !== updateUserData.oldPassword) {
      throw new ForbiddenException(Constants.USER_UNAUTHORIZED);
    }

    this.deleteUser(id);
    user.password = updateUserData.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    this.users.push(user);

    return cleanUpEntity(user);
  }
}

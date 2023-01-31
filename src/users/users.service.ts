import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ResponseUser, User } from './Entities/user.entitie';
import { AddUserDto } from './dto/add-user.dto';
import { v4 as uuid4 } from 'uuid';
import { Constants } from '../constants';
import { UpdateUserDto } from './dto/update-user.dto';
import { cleanUpEntity } from '../utils/helpers';

@Injectable()
export class UsersService {
  private users: User[] = [];
  public getAllUsers() {
    return this.users.map((user) =>
      cleanUpEntity<User, 'password'>(user, 'password'),
    );
  }
  private _findOneUser(id: string): User {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(Constants.USER_ERROR);
    }

    return user;
  }

  public getOneUser(id: string): ResponseUser {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(Constants.USER_ERROR);
    }

    return cleanUpEntity<typeof user, 'password'>(user, 'password');
  }
  public addUser(userData: AddUserDto): ResponseUser {
    const stamp = Date.now();
    const newUser = {
      id: uuid4(),
      createdAt: stamp,
      updatedAt: stamp,
      version: 1,
      ...userData,
    };

    this.users.push(newUser);

    return cleanUpEntity<typeof newUser, 'password'>(newUser, 'password');
  }
  public deleteUser(id: string): void {
    this._findOneUser(id);
    this.users = this.users.filter((user) => user.id !== id);
  }
  public updateUser(id: string, updateUserData: UpdateUserDto): ResponseUser {
    const user = this._findOneUser(id);

    if (user.password !== updateUserData.oldPassword) {
      throw new ForbiddenException(Constants.USER_UNAUTHORIZED);
    }

    this.deleteUser(id);
    user.password = updateUserData.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    this.users.push(user);

    return cleanUpEntity<typeof user, 'password'>(user, 'password');
  }
}

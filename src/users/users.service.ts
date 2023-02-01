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
import { db } from '../DB/db.service';

@Injectable()
export class UsersService {
  private users: User[] = db.users;
  public getAllUsers(): User[] {
    return this.users.map((user) => new User(user));
  }

  public getOneUser(id: string): User {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(Constants.USER_ERROR);
    }

    return new User(user);
  }
  public addUser(userData: AddUserDto): User {
    const stamp = Date.now();
    const newUser = {
      id: uuid4(),
      createdAt: stamp,
      updatedAt: stamp,
      version: 1,
      ...userData,
    };

    this.users.push(newUser);

    return new User(newUser);
  }
  public deleteUser(id: string): void {
    this.getOneUser(id);
    this.users = this.users.filter((user) => user.id !== id);
  }
  public updateUser(id: string, updateUserData: UpdateUserDto): User {
    const user = this.getOneUser(id);

    if (user.password !== updateUserData.oldPassword) {
      throw new ForbiddenException(Constants.USER_UNAUTHORIZED);
    }

    this.deleteUser(id);
    user.password = updateUserData.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    this.users.push(user);

    return new User(user);
  }
}

import { Injectable } from '@nestjs/common';
import { AddUserDto } from '../users/dto/add-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  public async signup(createAuthDto: AddUserDto) {
    return this.usersService.create(createAuthDto);
  }

  public async login() {
    return `login`;
  }

  public async refresh() {
    return `refresh`;
  }
}

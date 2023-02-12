import { Injectable } from '@nestjs/common';
import { AddUserDto } from '../users/dto/add-user.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/Entities/user.entitie';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import * as process from 'process';
import 'dotenv/config';
import { sign } from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET_KEY;
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly usersService: UsersService,
  ) {}
  public async signup(createAuthDto: AddUserDto): Promise<User> {
    return await this.usersService.create(createAuthDto);
  }

  public async getUser(loginDto: AddUserDto) {
    const user = await this.usersRepository.findOneBy({
      login: loginDto.login,
    });

    if (!user) {
      return null;
    }

    const isValidPassword = await compare(
      loginDto.password.toString(),
      user.password.toString(),
    );

    if (!isValidPassword) {
      return null;
    }
    return user;
  }

  public async generateJWT(user: User) {
    const { id, login } = user;
    const accessToken = sign({ id, login }, SECRET);
    const refreshToken = '';

    return { accessToken, refreshToken };
  }

  public async refresh() {
    return `refresh`;
  }
}

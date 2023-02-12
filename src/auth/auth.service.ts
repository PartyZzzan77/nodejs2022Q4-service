import { Injectable } from '@nestjs/common';
import { AddUserDto } from '../users/dto/add-user.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/Entities/user.entitie';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import * as process from 'process';
import 'dotenv/config';
import { sign, verify } from 'jsonwebtoken';
import { Tokens } from './types/tokens.interface';
import { TokenResponse } from './types/token-response.interface';

const SECRET = process.env.JWT_SECRET_KEY;
const ACCESS_TOKEN_TIME = process.env.TOKEN_EXPIRE_TIME;
const REFRESH_TOKEN_TIME = process.env.TOKEN_REFRESH_EXPIRE_TIME;
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

  public async generateJWT(user: User): Promise<Tokens> {
    const { id, login } = user;
    const accessToken = sign({ id, login }, SECRET, {
      expiresIn: ACCESS_TOKEN_TIME,
    });
    const refreshToken = sign({ id, login }, SECRET, {
      expiresIn: REFRESH_TOKEN_TIME,
    });

    return { accessToken, refreshToken };
  }

  private updateJWT({
    id,
    login,
  }: Pick<TokenResponse, 'id' | 'login'>): Tokens {
    const accessToken = sign({ id, login }, SECRET, {
      expiresIn: ACCESS_TOKEN_TIME,
    });
    const refreshToken = sign({ id, login }, SECRET, {
      expiresIn: REFRESH_TOKEN_TIME,
    });
    return { accessToken, refreshToken };
  }

  public async refresh(token: string) {
    try {
      const { id, login, exp } = verify(token, SECRET) as TokenResponse;

      if (Date.now() >= exp * 1000) {
        return null;
      }

      return this.updateJWT({ id, login });
    } catch {
      return null;
    }
  }
}

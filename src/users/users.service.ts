import { Injectable } from '@nestjs/common';
import {
  getTimestampInSeconds,
  hasPassword,
  User,
} from './Entities/user.entitie';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Constants } from '../constants';
import { UpdateUserDto } from './dto/update-user.dto';
import { compare } from 'bcrypt';
import { AddUserDto } from './dto/add-user.dto';

export type UpdateParams = {
  id: string;
  dto: UpdateUserDto;
};
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  public async find(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  public async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }
  public async create(dto: AddUserDto): Promise<User> {
    const userEntity = new User();
    Object.assign(userEntity, dto);
    return await this.usersRepository.save(userEntity);
  }
  public async update({ id, dto }: UpdateParams): Promise<User | string> {
    const user = await this.findOne(id);
    if (!user) {
      return Constants.USER_ERROR;
    }

    const isValidPassword = await compare(
      dto.oldPassword.toString(),
      user.password.toString(),
    );

    if (!isValidPassword) {
      return Constants.USER_INVALID;
    }

    const newPassword = await hasPassword(dto.newPassword.toString());

    await this.usersRepository.update(id, {
      password: newPassword.toString(),
      version: user.version + 1,
      updatedAt: getTimestampInSeconds(),
    });

    return await this.findOne(id);
  }

  public async delete(id: string): Promise<DeleteResult> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      return null;
    }

    return await this.usersRepository.delete({ id });
  }
}

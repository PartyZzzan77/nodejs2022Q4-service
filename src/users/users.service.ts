import { Injectable } from '@nestjs/common';
import {
  getTimestampInSeconds,
  hasPassword,
  User,
} from './Entities/user.entitie';
import { RepositoryService } from '../repository/repository.service';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Constants } from '../constants';
import { UpdateUserDto } from './dto/update-user.dto';
import { compareSync } from 'bcrypt';

export type UpdateParams = {
  id: string;
  dto: UpdateUserDto;
};
@Injectable()
export class UsersService {
  constructor(
    public repository: RepositoryService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  public async find(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  public async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }
  public async create(dto) {
    const userEntity = new User();
    Object.assign(userEntity, dto);
    return await this.usersRepository.save(userEntity);
  }
  public async update({ id, dto }: UpdateParams): Promise<User | string> {
    const user = await this.findOne(id);
    if (!user) {
      return Constants.USER_ERROR;
    }

    const isValidPassword = compareSync(dto.oldPassword, user.password);

    if (!isValidPassword) {
      return Constants.USER_INVALID;
    }

    const updatedUser = { ...user };
    updatedUser.updatedAt = getTimestampInSeconds();
    updatedUser.password = await hasPassword(dto.newPassword);
    updatedUser.version += 1;

    await this.usersRepository.update(id, updatedUser);
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

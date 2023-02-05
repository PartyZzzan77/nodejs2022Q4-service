import { Injectable } from '@nestjs/common';
import { User } from './Entities/user.entitie';
import { Entity, FindOneParams } from '../repository/types';
import { RepositoryService } from '../repository/repository.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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

  public findOne({ key, id }: FindOneParams): Entity | null {
    const user = this.repository.findOne({ key, id });

    if (!user) {
      return null;
    }

    return new User(user);
  }
  public create({ key, dto }): Partial<User> {
    const user = this.repository.create({ key, dto });
    return new User(user);
  }
  public delete({ key, id }) {
    return this.repository.delete({ key, id });
  }
  public update({ key, id, dto }) {
    const user = this.repository.update({ key, id, dto });
    return typeof user === 'string' ? user : new User(user);
  }
}

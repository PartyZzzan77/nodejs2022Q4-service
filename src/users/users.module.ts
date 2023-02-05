import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RepositoryModule } from '../repository/repository.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entities/user.entitie';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RepositoryModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

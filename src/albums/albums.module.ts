import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { RepositoryModule } from '../repository/repository.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './Entities/album.entities';
@Module({
  imports: [TypeOrmModule.forFeature([Album]), RepositoryModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}

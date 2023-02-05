import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { RepositoryModule } from '../repository/repository.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './Entities/atrtist.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Artist]), RepositoryModule],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}

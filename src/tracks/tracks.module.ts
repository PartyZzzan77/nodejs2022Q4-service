import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { RepositoryModule } from '../repository/repository.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './Entities/track.entitie';

@Module({
  imports: [TypeOrmModule.forFeature([Track]), RepositoryModule],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}

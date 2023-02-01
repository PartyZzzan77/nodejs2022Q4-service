import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TracksService } from '../tracks/tracks.service';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, TracksService, ArtistsService, AlbumsService],
})
export class FavoritesModule {}

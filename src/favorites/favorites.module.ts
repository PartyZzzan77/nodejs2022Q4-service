import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './Entities/favorite.entities';
import { Track } from '../tracks/Entities/track.entitie';
import { Album } from '../albums/Entities/album.entities';
import { Artist } from '../artists/Entities/atrtist.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Track, Album, Artist])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}

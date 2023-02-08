import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './Entities/album.entities';
import { Favorite } from '../favorites/Entities/favorite.entities';
import { FavoritesModule } from '../favorites/favorites.module';
import { TracksModule } from '../tracks/tracks.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Album, Favorite]),
    FavoritesModule,
    TracksModule,
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}

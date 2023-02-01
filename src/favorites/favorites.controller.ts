import { Controller, Get, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorite } from './Entities/favorite.entities';
import { TrackDtoId } from '../tracks/dto/track-id.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Get()
  getAllFavorites(): Favorite {
    return this.favoritesService.getAllFavorites();
  }
  @Post('track/:id')
  addTrackById(@Param() trackId: TrackDtoId) {
    return this.favoritesService.addTrackById(trackId.id);
  }
  @Post('album/:id')
  addAlbumById(@Param() trackId: TrackDtoId) {
    return this.favoritesService.addAlbumById(trackId.id);
  }
  @Post('artist/:id')
  addArtistById(@Param() trackId: TrackDtoId) {
    return this.favoritesService.addArtistById(trackId.id);
  }
}

import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorite } from './Entities/favorite.entities';
import { TrackDtoId } from '../tracks/dto/track-id.dto';
import { AlbumDtoId } from '../albums/dto/album-id.dto';
import { ArtistDtoId } from '../artists/dto/artist-id.dto';

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
  @Delete('track/:id')
  @HttpCode(204)
  deleteTrackById(@Param() trackId: TrackDtoId) {
    return this.favoritesService.deleteTrackById(trackId.id);
  }
  @Post('album/:id')
  addAlbumById(@Param() albumId: AlbumDtoId) {
    return this.favoritesService.addAlbumById(albumId.id);
  }
  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbumById(@Param() albumId: AlbumDtoId) {
    return this.favoritesService.deleteAlbumById(albumId.id);
  }
  @Post('artist/:id')
  addArtistById(@Param() artistId: ArtistDtoId) {
    return this.favoritesService.addArtistById(artistId.id);
  }
  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtistById(@Param() artistId: ArtistDtoId) {
    return this.favoritesService.deleteArtistById(artistId.id);
  }
}

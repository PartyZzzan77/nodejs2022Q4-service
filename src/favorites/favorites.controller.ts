import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorite } from './Entities/favorite.entities';
import { TrackDtoId } from '../tracks/dto/track-id.dto';
import { AlbumDtoId } from '../albums/dto/album-id.dto';
import { ArtistDtoId } from '../artists/dto/artist-id.dto';
import { Constants } from '../constants';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Get()
  find(): Favorite {
    return this.favoritesService.find();
  }
  @Post('track/:id')
  addTrack(@Param() { id }: TrackDtoId) {
    const track = this.favoritesService.create({ key: 'tracks', id });
    if (!track) {
      throw new UnprocessableEntityException(Constants.TRACK_INVALID);
    }
  }
  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param() { id }: TrackDtoId) {
    const track = this.favoritesService.delete({ key: 'tracks', id });

    if (!track) {
      throw new NotFoundException(Constants.TRACK_ERROR);
    }
  }
  @Post('album/:id')
  addAlbum(@Param() { id }: AlbumDtoId) {
    const album = this.favoritesService.create({ key: 'albums', id });
    if (!album) {
      throw new UnprocessableEntityException(Constants.ALBUM_INVALID);
    }
  }
  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(@Param() { id }: AlbumDtoId) {
    const album = this.favoritesService.delete({ key: 'albums', id });

    if (!album) {
      throw new NotFoundException(Constants.ALBUM_ERROR);
    }
  }
  @Post('artist/:id')
  addArtist(@Param() { id }: ArtistDtoId) {
    const artist = this.favoritesService.create({ key: 'artists', id });
    if (!artist) {
      throw new UnprocessableEntityException(Constants.ARTIST_INVALID);
    }
  }
  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param() { id }: ArtistDtoId) {
    const artist = this.favoritesService.delete({ key: 'artists', id });

    if (!artist) {
      throw new NotFoundException(Constants.ARTIST_ERROR);
    }
  }
}

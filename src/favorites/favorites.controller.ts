import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Res,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorite, ResponseFav } from './Entities/favorite.entities';
import { TrackDtoId } from '../tracks/dto/track-id.dto';
import { AlbumDtoId } from '../albums/dto/album-id.dto';
import { ArtistDtoId } from '../artists/dto/artist-id.dto';
import { Constants } from '../constants';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@Controller('favs')
@ApiTags('Favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @ApiOperation({
    summary: `Gets all favorites`,
    description: 'Gets all favorites',
  })
  @ApiResponse({
    status: 200,
    type: Favorite,
    description: 'Successful operation',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @Get()
  find(): Favorite {
    return this.favoritesService.find();
  }

  @ApiOperation({
    summary: `Add track to favorites`,
    description: 'Add track to favorite',
  })
  @ApiResponse({
    status: 201,
    type: ResponseFav,
    description: 'Successful operation',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Track not found',
  })
  @Post('track/:id')
  addTrack(@Param() { id }: TrackDtoId, @Res() res) {
    const track = this.favoritesService.create({ key: 'tracks', id });

    if (!track) {
      throw new UnprocessableEntityException(Constants.TRACK_INVALID);
    }

    return res.send({ message: Constants.TRACK_SUCCESS });
  }

  @ApiOperation({
    summary: `Delete track from favorites`,
    description: `Delete track from favorites`,
  })
  @ApiResponse({
    status: 204,
    description: 'The track has been deleted',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param() { id }: TrackDtoId) {
    const track = this.favoritesService.delete({ key: 'tracks', id });

    if (!track) {
      throw new NotFoundException(Constants.TRACK_ERROR);
    }
  }

  @ApiOperation({
    summary: `Add album to favorites`,
    description: 'Add album to favorite',
  })
  @ApiResponse({
    status: 201,
    type: ResponseFav,
    description: 'Successful operation',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Album not found',
  })
  @Post('album/:id')
  addAlbum(@Param() { id }: AlbumDtoId, @Res() res) {
    const album = this.favoritesService.create({ key: 'albums', id });

    if (!album) {
      throw new UnprocessableEntityException(Constants.ALBUM_INVALID);
    }

    return res.send({ message: Constants.ALBUM_SUCCESS });
  }

  @ApiOperation({
    summary: `Delete album from favorites`,
    description: `Delete album from favorites`,
  })
  @ApiResponse({
    status: 204,
    description: 'The album has been deleted',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album not found' })
  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(@Param() { id }: AlbumDtoId) {
    const album = this.favoritesService.delete({ key: 'albums', id });

    if (!album) {
      throw new NotFoundException(Constants.ALBUM_ERROR);
    }
  }

  @ApiOperation({
    summary: `Add artist to favorites`,
    description: 'Add artist to favorite',
  })
  @ApiResponse({
    status: 201,
    type: ResponseFav,
    description: 'Successful operation',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Artist not found',
  })
  @Post('artist/:id')
  addArtist(@Param() { id }: ArtistDtoId, @Res() res) {
    const artist = this.favoritesService.create({ key: 'artists', id });

    if (!artist) {
      throw new UnprocessableEntityException(Constants.ARTIST_INVALID);
    }

    res.send({ message: Constants.ARTIST_SUCCESS });
  }

  @ApiOperation({
    summary: `Delete artist from favorites`,
    description: `Delete artist from favorites`,
  })
  @ApiResponse({
    status: 204,
    description: 'The artist has been deleted',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param() { id }: ArtistDtoId) {
    const artist = this.favoritesService.delete({ key: 'artists', id });

    if (!artist) {
      throw new NotFoundException(Constants.ARTIST_ERROR);
    }
  }
}

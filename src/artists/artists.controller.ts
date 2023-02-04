import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { AddArtistDto } from './dto/add-artist.dto';
import { ArtistDtoId } from './dto/artist-id.dto';
import { Constants } from '../constants';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Artist } from './Entities/atrtist.entities';

@Controller('artist')
@ApiTags('Arrtist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @ApiOperation({
    summary: `Gets all artists`,
    description: 'Gets all artists',
  })
  @ApiResponse({
    status: 200,
    type: [Artist],
    description: 'Successful operation',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @Get()
  find() {
    return this.artistsService.find('artists');
  }

  @ApiOperation({
    summary: `Add new artist`,
    description: 'Add new artist',
  })
  @ApiBody({ type: AddArtistDto })
  @ApiResponse({
    status: 201,
    type: Artist,
    description: 'Successful operation',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @Post()
  create(@Body() dto: AddArtistDto) {
    return this.artistsService.create({ key: 'artists', dto });
  }

  @ApiOperation({
    summary: 'Get single artist',
    description: 'Get single artist by id',
  })
  @ApiResponse({
    status: 200,
    type: Artist,
    description: 'Successful operation',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({ description: 'Artist not found.' })
  @Get(':id')
  findOne(@Param() { id }: ArtistDtoId) {
    const artist = this.artistsService.findOne({ key: 'artists', id });
    if (!artist) {
      throw new NotFoundException(Constants.ARTIST_ERROR);
    }
  }

  @ApiOperation({
    summary: `Update artist information`,
    description: 'Update library artist information by UUID',
  })
  @ApiBody({ type: UpdateArtistDto })
  @ApiResponse({
    status: 200,
    type: Artist,
    description: 'The artist has been updated.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  @Put(':id')
  update(@Param() { id }: ArtistDtoId, @Body() dto: UpdateArtistDto) {
    const result = this.artistsService.update({ key: 'artists', id, dto });
    if (result === Constants.ENTITY_ERROR) {
      throw new NotFoundException(Constants.ENTITY_ERROR);
    }
    return result;
  }

  @ApiOperation({
    summary: `Delete artist`,
    description: `Delete artist from library`,
  })
  @ApiResponse({
    status: 204,
    description: 'The artist has been deleted',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  @Delete(':id')
  @HttpCode(204)
  delete(@Param() { id }: ArtistDtoId) {
    const result = this.artistsService.delete({ key: 'artists', id });
    if (!result) {
      throw new NotFoundException(Constants.ARTIST_ERROR);
    }
  }
}

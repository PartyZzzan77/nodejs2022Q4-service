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
import { AlbumsService } from './albums.service';
import { AlbumDtoId } from './dto/album-id.dto';
import { AddAlbumDto } from './dto/add-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Constants } from '../constants';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Album } from './Entities/album.entities';
import {
  BadRequestUUID,
  NotFound,
  RequiredFields,
} from '../users/Entities/user.entitie';

@Controller('album')
@ApiTags('Album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @ApiOperation({
    summary: `Get albums list`,
    description: 'Gets all library albums list',
  })
  @ApiResponse({
    status: 200,
    type: [Album],
    description: 'Successful operation',
  })
  @Get()
  find() {
    return this.albumsService.find('albums');
  }

  @ApiOperation({
    summary: `Add new album`,
    description: 'Add new album information',
  })
  @ApiBody({ type: AddAlbumDto })
  @ApiResponse({
    status: 201,
    type: Album,
    description: 'Album is created',
  })
  @ApiBadRequestResponse({
    type: RequiredFields,
    description: 'Bad request. body does not contain required fields',
  })
  @Post()
  create(@Body() dto: AddAlbumDto) {
    return this.albumsService.create({ key: 'albums', dto });
  }

  @ApiOperation({
    summary: 'Get single album by id',
    description: 'Get single album by id',
  })
  @ApiResponse({
    status: 200,
    type: Album,
    description: 'Successful operation',
  })
  @ApiBadRequestResponse({
    type: BadRequestUUID,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ type: NotFound, description: 'Album not found.' })
  @Get(':id')
  findOne(@Param() { id }: AlbumDtoId) {
    const album = this.albumsService.findOne({ key: 'albums', id });
    if (!album) {
      throw new NotFoundException(Constants.ALBUM_ERROR);
    }
  }

  @ApiOperation({
    summary: `Update album information`,
    description: 'Update library album information by UUID',
  })
  @ApiBody({ type: UpdateAlbumDto })
  @ApiResponse({
    status: 200,
    type: Album,
    description: 'The album has been updated.',
  })
  @ApiBadRequestResponse({
    type: BadRequestUUID,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ type: NotFound, description: 'Album not found' })
  @Put(':id')
  update(@Param() { id }: AlbumDtoId, @Body() dto: UpdateAlbumDto) {
    const result = this.albumsService.update({ key: 'albums', id, dto });
    if (result === Constants.ENTITY_ERROR) {
      throw new NotFoundException(Constants.ENTITY_ERROR);
    }
    return result;
  }

  @ApiOperation({
    summary: `Delete album`,
    description: `Delete album from library`,
  })
  @ApiResponse({
    status: 204,
    description: 'The album has been deleted',
  })
  @ApiBadRequestResponse({
    type: BadRequestUUID,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ type: NotFound, description: 'Album not found' })
  @Delete(':id')
  @HttpCode(204)
  delete(@Param() { id }: AlbumDtoId) {
    const result = this.albumsService.delete({ key: 'albums', id });
    if (!result) {
      throw new NotFoundException(Constants.TRACK_ERROR);
    }
    return result;
  }
}

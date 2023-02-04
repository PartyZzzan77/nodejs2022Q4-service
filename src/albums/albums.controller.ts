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

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}
  @Get()
  find() {
    return this.albumsService.find('albums');
  }
  @Get(':id')
  findOne(@Param() { id }: AlbumDtoId) {
    const album = this.albumsService.findOne({ key: 'albums', id });
    if (!album) {
      throw new NotFoundException(Constants.ALBUM_ERROR);
    }
  }
  @Post()
  create(@Body() dto: AddAlbumDto) {
    return this.albumsService.create({ key: 'albums', dto });
  }
  @Delete(':id')
  @HttpCode(204)
  delete(@Param() { id }: AlbumDtoId) {
    const result = this.albumsService.delete({ key: 'albums', id });
    if (!result) {
      throw new NotFoundException(Constants.TRACK_ERROR);
    }
    return result;
  }
  @Put(':id')
  update(@Param() { id }: AlbumDtoId, @Body() dto: UpdateAlbumDto) {
    const result = this.albumsService.update({ key: 'albums', id, dto });
    if (result === Constants.ENTITY_ERROR) {
      throw new NotFoundException(Constants.ENTITY_ERROR);
    }
    return result;
  }
}

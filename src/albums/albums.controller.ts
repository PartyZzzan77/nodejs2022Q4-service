import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { Album } from './Entities/album.entities';
import { AlbumDtoId } from './dto/album-id.dto';
import { AddAlbumDto } from './dto/add-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}
  @Get()
  getAllTracks(): Album[] {
    return this.albumsService.getAllAlbums();
  }
  @Get(':id')
  getOneAlbum(@Param() albumId: AlbumDtoId): Album {
    return this.albumsService.getOneAlbum(albumId.id);
  }
  @Post()
  addAlbum(@Body() albumData: AddAlbumDto): Album {
    return this.albumsService.addAlbum(albumData);
  }
  @Put(':id')
  updateAlbum(
    @Param() albumId: AlbumDtoId,
    @Body() updateAlbumData: UpdateAlbumDto,
  ): Album {
    return this.albumsService.updateAlbum(albumId.id, updateAlbumData);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param() albumId: AlbumDtoId): string {
    return this.albumsService.deleteAlbum(albumId.id);
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { Album } from './Entities/album.entities';
import { AlbumDtoId } from './dto/album-id.dto';
import { AddAlbumDto } from './dto/add-album.dto';

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
}

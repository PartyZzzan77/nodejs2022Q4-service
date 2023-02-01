import { Controller, Get } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { Album } from './Entities/album.entities';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}
  @Get()
  getAllTracks(): Album[] {
    return this.albumsService.getAllAlbums();
  }
}

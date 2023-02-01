import { Controller, Get } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { Artist } from './Entities/atrtist.entities';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}
  @Get()
  getAllTracks(): Artist[] {
    return this.artistsService.getAllArtists();
  }
}

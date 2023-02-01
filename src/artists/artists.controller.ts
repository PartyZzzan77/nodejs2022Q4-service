import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { Artist } from './Entities/atrtist.entities';
import { AddArtistDto } from './dto/add-artist.dto';
import { ArtistDtoId } from './dto/artist-id.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}
  @Get()
  getAllTracks(): Artist[] {
    return this.artistsService.getAllArtists();
  }
  @Get(':id')
  getOneArtist(@Param() artistId: ArtistDtoId): Artist {
    return this.artistsService.getOneArtist(artistId.id);
  }
  @Post()
  addArtist(@Body() artistData: AddArtistDto): Artist {
    return this.artistsService.addArtist(artistData);
  }
}

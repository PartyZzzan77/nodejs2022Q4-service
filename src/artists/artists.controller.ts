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
import { ArtistsService } from './artists.service';
import { Artist } from './Entities/atrtist.entities';
import { AddArtistDto } from './dto/add-artist.dto';
import { ArtistDtoId } from './dto/artist-id.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

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
  @Put(':id')
  updateTrack(
    @Param() artistId: ArtistDtoId,
    @Body() updateArtistData: UpdateArtistDto,
  ): Artist {
    return this.artistsService.updateArtist(artistId.id, updateArtistData);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param() artistId: ArtistDtoId): string {
    return this.artistsService.deleteArtist(artistId.id);
  }
}

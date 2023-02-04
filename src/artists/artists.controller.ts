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

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}
  @Get()
  find() {
    return this.artistsService.find('artists');
  }
  @Get(':id')
  findOne(@Param() { id }: ArtistDtoId) {
    const artist = this.artistsService.findOne({ key: 'artists', id });
    if (!artist) {
      throw new NotFoundException(Constants.ARTIST_ERROR);
    }
  }
  @Post()
  create(@Body() dto: AddArtistDto) {
    return this.artistsService.create({ key: 'artists', dto });
  }
  @Delete(':id')
  @HttpCode(204)
  delete(@Param() { id }: ArtistDtoId) {
    const result = this.artistsService.delete({ key: 'artists', id });
    if (!result) {
      throw new NotFoundException(Constants.ARTIST_ERROR);
    }
  }
  @Put(':id')
  update(@Param() { id }: ArtistDtoId, @Body() dto: UpdateArtistDto) {
    const result = this.artistsService.update({ key: 'artists', id, dto });
    if (result === Constants.ENTITY_ERROR) {
      throw new NotFoundException(Constants.ENTITY_ERROR);
    }
    return result;
  }
}

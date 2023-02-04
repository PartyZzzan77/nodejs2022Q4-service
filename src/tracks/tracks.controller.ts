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
import { TracksService } from './tracks.service';
import { TrackDtoId } from './dto/track-id.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { AddTrackDto } from './dto/add-track.dto';
import { Constants } from '../constants';

@Controller('track')
export class TracksController {
  constructor(private readonly trackService: TracksService) {}

  @Get()
  find() {
    return this.trackService.find('tracks');
  }
  @Get(':id')
  findOne(@Param() { id }: TrackDtoId) {
    const track = this.trackService.findOne({ key: 'tracks', id });

    if (!track) {
      throw new NotFoundException(Constants.TRACK_ERROR);
    }

    return track;
  }
  @Post()
  create(@Body() dto: AddTrackDto) {
    return this.trackService.create({ key: 'tracks', dto });
  }
  @Delete(':id')
  @HttpCode(204)
  delete(@Param() { id }: TrackDtoId) {
    const result = this.trackService.delete({ key: 'tracks', id });
    if (!result) {
      throw new NotFoundException(Constants.TRACK_ERROR);
    }
  }
  @Put(':id')
  update(@Param() { id }: TrackDtoId, @Body() dto: UpdateTrackDto) {
    const result = this.trackService.update({ key: 'tracks', id, dto });
    if (result === Constants.ENTITY_ERROR) {
      throw new NotFoundException(Constants.ENTITY_ERROR);
    }
    return result;
  }
}

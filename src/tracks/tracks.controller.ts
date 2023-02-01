import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { Track } from './Entities/track.entitie';
import { TrackDtoId } from './dto/track-id.dto';
import { AddTrackDto } from './dto/add-track.dto';
@Controller('track')
export class TracksController {
  constructor(private readonly trackService: TracksService) {}

  @Get()
  getAllTracks(): Track[] {
    return this.trackService.getAllTracks();
  }
  @Get(':id')
  getOneUser(@Param() trackId: TrackDtoId): Track {
    return this.trackService.getOneTrack(trackId.id);
  }
  @Post()
  addTrack(@Body() trackData: AddTrackDto): Track {
    return this.trackService.addTrack(trackData);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param() trackId: TrackDtoId): string {
    return this.trackService.deleteTrack(trackId.id);
  }
}

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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Track } from './Entities/track.entitie';
import {
  BadRequestUUID,
  NotFound,
  RequiredFields,
} from '../users/Entities/user.entitie';

@Controller('track')
@ApiTags('Track')
export class TracksController {
  constructor(private readonly trackService: TracksService) {}

  @ApiOperation({ summary: `Gets all library tracks list` })
  @ApiResponse({
    status: 200,
    type: [Track],
    description: 'Successful operation',
  })
  @Get()
  async find(): Promise<Track[]> {
    return await this.trackService.find();
  }
  @ApiOperation({
    summary: `Add new track`,
    description: 'Add new track information',
  })
  @ApiBody({ type: AddTrackDto })
  @ApiResponse({
    status: 201,
    type: Track,
    description: 'Successful operation',
  })
  @ApiBadRequestResponse({
    type: RequiredFields,
    description: 'Bad request. body does not contain required fields',
  })
  @Post()
  create(@Body() dto: AddTrackDto) {
    return this.trackService.create({ key: 'tracks', dto });
  }

  @ApiOperation({
    summary: 'Gets single track by id',
    description: 'Gets single track by id',
  })
  @ApiResponse({
    status: 200,
    type: Track,
    description: 'Successful operation',
  })
  @ApiBadRequestResponse({
    type: BadRequestUUID,
    description: 'Bad request. TackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ type: NotFound, description: 'Track not found.' })
  @Get(':id')
  findOne(@Param() { id }: TrackDtoId) {
    const track = this.trackService.findOne({ key: 'tracks', id });

    if (!track) {
      throw new NotFoundException(Constants.TRACK_ERROR);
    }

    return track;
  }

  @ApiOperation({
    summary: `Update track information`,
    description: 'Update library track information by UUID',
  })
  @ApiBody({ type: UpdateTrackDto })
  @ApiResponse({
    status: 200,
    type: Track,
    description: 'The track has been updated.',
  })
  @ApiBadRequestResponse({
    type: BadRequestUUID,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ type: NotFound, description: 'Track not found' })
  @Put(':id')
  update(@Param() { id }: TrackDtoId, @Body() dto: UpdateTrackDto) {
    const result = this.trackService.update({ key: 'tracks', id, dto });
    if (result === Constants.ENTITY_ERROR) {
      throw new NotFoundException(Constants.ENTITY_ERROR);
    }
    return result;
  }

  @ApiOperation({
    summary: `Delete track`,
    description: `Delete track from library`,
  })
  @ApiResponse({
    status: 204,
    description: 'The track has been deleted',
  })
  @ApiBadRequestResponse({
    type: BadRequestUUID,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ type: NotFound, description: 'Track not found' })
  @Delete(':id')
  @HttpCode(204)
  delete(@Param() { id }: TrackDtoId) {
    const result = this.trackService.delete({ key: 'tracks', id });
    if (!result) {
      throw new NotFoundException(Constants.TRACK_ERROR);
    }
  }
}

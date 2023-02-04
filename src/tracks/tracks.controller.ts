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
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Track } from './Entities/track.entitie';

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
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @Get()
  find() {
    return this.trackService.find('tracks');
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
    description: 'Bad request. body does not contain required fields',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
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
    description: 'Bad request. TackId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({ description: 'Track not found.' })
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
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
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
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiUnauthorizedResponse({
    description: 'Access token is missing or invalid',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  @Delete(':id')
  @HttpCode(204)
  delete(@Param() { id }: TrackDtoId) {
    const result = this.trackService.delete({ key: 'tracks', id });
    if (!result) {
      throw new NotFoundException(Constants.TRACK_ERROR);
    }
  }
}

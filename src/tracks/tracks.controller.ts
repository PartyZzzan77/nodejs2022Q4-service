import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
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
import { isUUID } from 'class-validator';
import { DeleteResult } from 'typeorm';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('track')
@UseGuards(AuthGuard)
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
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Track> {
    if (!isUUID(id, 4)) {
      throw new BadRequestException(Constants.ID_ERROR);
    }

    const track = await this.trackService.findOne(id);

    if (!track) {
      throw new NotFoundException(Constants.TRACK_ERROR);
    }

    return track;
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
  async create(@Body() dto: AddTrackDto): Promise<Track> {
    return await this.trackService.create(dto);
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
  @UsePipes(new ValidationPipe())
  async update(
    @Param() { id }: TrackDtoId,
    @Body() dto: UpdateTrackDto,
  ): Promise<Track> {
    const result = await this.trackService.update({ id, dto });

    if (!result) {
      throw new NotFoundException(Constants.TRACK_ERROR);
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
  @UsePipes(new ValidationPipe())
  @HttpCode(204)
  async delete(@Param() { id }: TrackDtoId): Promise<DeleteResult> {
    const track = await this.trackService.delete(id);

    if (!track.affected) {
      throw new NotFoundException(Constants.TRACK_ERROR);
    }
    return track;
  }
}

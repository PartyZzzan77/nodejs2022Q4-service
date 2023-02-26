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
import { ArtistsService } from './artists.service';
import { AddArtistDto } from './dto/add-artist.dto';
import { ArtistDtoId } from './dto/artist-id.dto';
import { Constants } from '../constants';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Artist } from './Entities/atrtist.entities';
import {
  BadRequestUUID,
  NotFound,
  RequiredFields,
  RequiredToken,
} from '../users/Entities/user.entitie';
import { isUUID } from 'class-validator';
import { DeleteResult } from 'typeorm';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('artist')
@UseGuards(AuthGuard)
@ApiTags('Artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @ApiOperation({
    summary: `Gets all artists`,
    description: 'Gets all artists',
  })
  @ApiResponse({
    status: 200,
    type: [Artist],
    description: 'Successful operation',
  })
  @ApiUnauthorizedResponse({
    type: RequiredToken,
    description: 'Access token is missing or invalid',
  })
  @Get()
  async find(): Promise<Artist[]> {
    return await this.artistsService.find();
  }

  @ApiOperation({
    summary: 'Get single artist',
    description: 'Get single artist by id',
  })
  @ApiResponse({
    status: 200,
    type: Artist,
    description: 'Successful operation',
  })
  @ApiBadRequestResponse({
    type: BadRequestUUID,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ type: NotFound, description: 'Artist not found.' })
  @ApiUnauthorizedResponse({
    type: RequiredToken,
    description: 'Access token is missing or invalid',
  })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
    if (!isUUID(id, 4)) {
      throw new BadRequestException(Constants.ID_ERROR);
    }

    const artist = await this.artistsService.findOne(id);

    if (!artist) {
      throw new NotFoundException(Constants.ARTIST_ERROR);
    }

    return artist;
  }

  @ApiOperation({
    summary: `Add new artist`,
    description: 'Add new artist',
  })
  @ApiBody({ type: AddArtistDto })
  @ApiResponse({
    status: 201,
    type: Artist,
    description: 'Successful operation',
  })
  @ApiBadRequestResponse({
    type: RequiredFields,
    description: 'Bad request. body does not contain required fields',
  })
  @ApiUnauthorizedResponse({
    type: RequiredToken,
    description: 'Access token is missing or invalid',
  })
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: AddArtistDto): Promise<Artist> {
    return this.artistsService.create(dto);
  }

  @ApiOperation({
    summary: `Update artist information`,
    description: 'Update library artist information by UUID',
  })
  @ApiBody({ type: UpdateArtistDto })
  @ApiResponse({
    status: 200,
    type: Artist,
    description: 'The artist has been updated.',
  })
  @ApiBadRequestResponse({
    type: BadRequestUUID,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ type: NotFound, description: 'Artist not found' })
  @ApiUnauthorizedResponse({
    type: RequiredToken,
    description: 'Access token is missing or invalid',
  })
  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param() { id }: ArtistDtoId,
    @Body() dto: UpdateArtistDto,
  ): Promise<Artist> {
    const result = await this.artistsService.update({ id, dto });

    if (!result) {
      throw new NotFoundException(Constants.ARTIST_ERROR);
    }

    return result;
  }

  @ApiOperation({
    summary: `Delete artist`,
    description: `Delete artist from library`,
  })
  @ApiResponse({
    status: 204,
    description: 'The artist has been deleted',
  })
  @ApiBadRequestResponse({
    type: BadRequestUUID,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ type: NotFound, description: 'Artist not found' })
  @ApiUnauthorizedResponse({
    type: RequiredToken,
    description: 'Access token is missing or invalid',
  })
  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @HttpCode(204)
  async delete(@Param() { id }: ArtistDtoId): Promise<DeleteResult> {
    const track = await this.artistsService.delete(id);

    if (!track.affected) {
      throw new NotFoundException(Constants.ARTIST_ERROR);
    }

    return track;
  }
}

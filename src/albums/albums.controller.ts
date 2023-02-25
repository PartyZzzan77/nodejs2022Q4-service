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
import { AlbumsService } from './albums.service';
import { AlbumDtoId } from './dto/album-id.dto';
import { AddAlbumDto } from './dto/add-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Constants } from '../constants';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Album } from './Entities/album.entities';
import {
  BadRequestUUID,
  NotFound,
  RequiredFields,
} from '../users/Entities/user.entitie';
import { isUUID } from 'class-validator';
import { DeleteResult } from 'typeorm';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('album')
@UseGuards(AuthGuard)
@ApiTags('Album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @ApiOperation({
    summary: `Get albums list`,
    description: 'Gets all library albums list',
  })
  @ApiResponse({
    status: 200,
    type: [Album],
    description: 'Successful operation',
  })
  @Get()
  async find(): Promise<Album[]> {
    return await this.albumsService.find();
  }

  @ApiOperation({
    summary: 'Get single album by id',
    description: 'Get single album by id',
  })
  @ApiResponse({
    status: 200,
    type: Album,
    description: 'Successful operation',
  })
  @ApiBadRequestResponse({
    type: BadRequestUUID,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ type: NotFound, description: 'Album not found.' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
    if (!isUUID(id, 4)) {
      throw new BadRequestException(Constants.ID_ERROR);
    }

    const album = await this.albumsService.findOne(id);

    if (!album) {
      throw new NotFoundException(Constants.ALBUM_ERROR);
    }

    return album;
  }

  @ApiOperation({
    summary: `Add new album`,
    description: 'Add new album information',
  })
  @ApiBody({ type: AddAlbumDto })
  @ApiResponse({
    status: 201,
    type: Album,
    description: 'Album is created',
  })
  @ApiBadRequestResponse({
    type: RequiredFields,
    description: 'Bad request. body does not contain required fields',
  })
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: AddAlbumDto) {
    return this.albumsService.create(dto);
  }

  @ApiOperation({
    summary: `Update album information`,
    description: 'Update library album information by UUID',
  })
  @ApiBody({ type: UpdateAlbumDto })
  @ApiResponse({
    status: 200,
    type: Album,
    description: 'The album has been updated.',
  })
  @ApiBadRequestResponse({
    type: BadRequestUUID,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ type: NotFound, description: 'Album not found' })
  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param() { id }: AlbumDtoId,
    @Body() dto: UpdateAlbumDto,
  ): Promise<Album> {
    const result = await this.albumsService.update({ id, dto });

    if (!result) {
      throw new NotFoundException(Constants.ENTITY_ERROR);
    }
    return result;
  }

  @ApiOperation({
    summary: `Delete album`,
    description: `Delete album from library`,
  })
  @ApiResponse({
    status: 204,
    description: 'The album has been deleted',
  })
  @ApiBadRequestResponse({
    type: BadRequestUUID,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ type: NotFound, description: 'Album not found' })
  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @HttpCode(204)
  async delete(@Param() { id }: AlbumDtoId): Promise<DeleteResult> {
    const album = await this.albumsService.delete(id);

    if (!album.affected) {
      throw new NotFoundException(Constants.ALBUM_ERROR);
    }
    return album;
  }
}

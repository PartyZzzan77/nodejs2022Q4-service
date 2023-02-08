import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './Entities/album.entities';
import { AddAlbumDto } from './dto/add-album.dto';
import { UpdateAlbumParams } from './types/update.album.params.interface';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    private readonly favoritesService: FavoritesService,
  ) {}
  public async find(): Promise<Album[]> {
    return await this.albumsRepository.find();
  }
  public async findOne(id: string): Promise<Album> {
    return this.albumsRepository.findOneBy({ id });
  }
  public async create(dto: AddAlbumDto): Promise<Album> {
    const albumEntity = new Album();
    Object.assign(albumEntity, dto);
    return await this.albumsRepository.save(albumEntity);
  }
  public async delete(id: string) {
    await this.favoritesService.delete({ key: 'albums', id });
    return await this.albumsRepository.delete({ id });
  }
  public async update({ id, dto }: UpdateAlbumParams): Promise<Album> {
    const album = await this.findOne(id);

    if (!album) {
      return null;
    }

    Object.assign(album, dto);
    await this.albumsRepository.update(id, album);

    return album;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './Entities/favorite.entities';
import { Track } from '../tracks/Entities/track.entitie';
import { Album } from '../albums/Entities/album.entities';
import { Artist } from '../artists/Entities/atrtist.entities';
import { CreateFaforitesParams } from './types/create.favorites.params.interface';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoritesRepository: Repository<Favorite>,
    @InjectRepository(Track)
    private readonly tracks: Repository<Track>,
    @InjectRepository(Album)
    private readonly albums: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artists: Repository<Artist>,
  ) {}
  public async find() {
    const base = !(await this.getBase())
      ? await this.initBase()
      : await this.getBase();

    base.tracks = this.serializeEntity(base.tracks);
    base.artists = this.serializeEntity(base.artists);
    base.albums = this.serializeEntity(base.albums);

    return base;
  }
  private serializeEntity(entity) {
    return entity.map((e) => (typeof e === 'string' ? JSON.parse(e) : e));
  }
  private async initBase() {
    return this.favoritesRepository.save({});
  }

  private async getBase(): Promise<Favorite> {
    const base = await this.favoritesRepository.find({ where: { id: 1 } });
    return { ...base }[0];
  }

  public async create({ key, id }: CreateFaforitesParams) {
    const allEntity = await this.getBase();
    const entity = await this[key].findOneBy({ id });

    if (!entity) {
      return null;
    }

    if (entity.id === id) {
      const isAlreadyExistFavorites = this.serializeEntity(allEntity[key]).find(
        (e) => e.id === id,
      );

      if (isAlreadyExistFavorites) {
        return null;
      }

      if (entity instanceof Track) {
        allEntity.tracks.push(entity);
      } else if (entity instanceof Album) {
        allEntity.albums.push(entity);
      } else if (entity instanceof Artist) {
        allEntity.artists.push(entity);
      }
    }

    return await this.favoritesRepository.save({ ...allEntity });
  }

  private cleanUpFavorites(id, entity = []) {
    return this.serializeEntity(entity).filter((e) => e.id !== id);
  }

  public async delete({ key, id }: CreateFaforitesParams) {
    const allEntity = await this.getBase();
    const entity = await this[key].findOneBy({ id });

    if (!entity) {
      return null;
    }

    if (entity.id === id) {
      if (entity instanceof Track) {
        allEntity.tracks = this.cleanUpFavorites(id, allEntity.tracks);
      } else if (entity instanceof Album) {
        allEntity.albums = this.cleanUpFavorites(id, allEntity.albums);
      } else if (entity instanceof Artist) {
        allEntity.artists = this.cleanUpFavorites(id, allEntity.artists);
      }
    }

    return await this.favoritesRepository.save({ ...allEntity });
  }
}

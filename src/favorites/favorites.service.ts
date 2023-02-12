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
    const [favorites] = await this.favoritesRepository.find({
      relations: {
        tracks: true,
        albums: true,
        artists: true,
      },
    });

    if (!favorites) {
      await this.favoritesRepository.save(new Favorite());
    }

    const { tracks, albums, artists } = favorites;

    return { tracks, albums, artists };
  }

  private getEntity = async ({ key, id }: CreateFaforitesParams) => {
    const [favorites] = await this.favoritesRepository.find({
      relations: {
        tracks: true,
        albums: true,
        artists: true,
      },
    });

    if (!favorites) {
      await this.favoritesRepository.save(new Favorite());
    }

    const entity = await this[key].findOneBy({ id });

    return {
      favorites,
      entity,
    };
  };

  public async create({ key, id }: CreateFaforitesParams) {
    const { favorites, entity } = await this.getEntity({ key, id });

    if (!entity) {
      return null;
    }

    if (entity instanceof Track) {
      favorites.tracks.push(entity);
    }

    if (entity instanceof Album) {
      favorites.albums.push(entity);
    }

    if (entity instanceof Artist) {
      favorites.artists.push(entity);
    }

    return await this.favoritesRepository.save(favorites);
  }

  public async delete({ key, id }: CreateFaforitesParams) {
    const { favorites, entity } = await this.getEntity({ key, id });

    if (!entity) {
      return null;
    }

    if (entity instanceof Track) {
      favorites.tracks = favorites.tracks.filter((entity) => entity.id !== id);
    }

    if (entity instanceof Album) {
      favorites.albums = favorites.albums.filter((entity) => entity.id !== id);
    }

    if (entity instanceof Artist) {
      favorites.artists = favorites.artists.filter(
        (entity) => entity.id !== id,
      );
    }

    return this.favoritesRepository.save(favorites);
  }
}

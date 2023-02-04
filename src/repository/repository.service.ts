import { Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import { User } from '../users/Entities/user.entitie';
import { Track } from '../tracks/Entities/track.entitie';
import { Artist } from '../artists/Entities/atrtist.entities';
import { AddUserDto } from '../users/dto/add-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { Constants } from '../constants';
import { Favorite } from '../favorites/Entities/favorite.entities';
import {
  CreateParams,
  DeleteParams,
  Entity,
  FindOneParams,
  UpdateParams,
  Storage,
} from './types';

@Injectable()
export class RepositoryService {
  users: User[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums = [];
  favorites: Favorite = {
    tracks: [],
    artists: [],
    albums: [],
  };

  public findFav() {
    return this.favorites;
  }
  public createFav({ key, id }: FindOneParams) {
    const entity = this.findOne({ key, id });

    if (!entity) {
      return null;
    }

    if (entity.id === id) {
      this.favorites[key].push(entity);
      return entity;
    }
  }
  public deleteFav({ key, id }: FindOneParams): Entity | null {
    const entity = this.findOne({ key, id });
    const isFavorites = this.favorites[key].find((e) => e.id === id);

    if (!entity || !isFavorites) {
      return null;
    }

    this.favorites[key] = this.favorites[key].filter((el) => el.id !== id);

    return entity;
  }
  public find(storage: Storage) {
    return this[storage].map((e) => (e instanceof User ? new User(e) : e));
  }
  public findOne({ key, id }: FindOneParams): Entity | null {
    const entity = this[key].find((e) => e.id === id);
    if (!entity) {
      return null;
    }
    return entity;
  }
  public create({ key, dto }: CreateParams) {
    if (dto instanceof AddUserDto) {
      const stamp = Date.now();
      const newUser = {
        id: uuid4(),
        createdAt: stamp,
        updatedAt: stamp,
        version: 1,
        ...dto,
      };

      this[key].push(newUser);

      return newUser;
    }

    const newEntity = {
      id: uuid4(),
      ...dto,
    };

    this[key].push(newEntity);

    return newEntity;
  }
  public update({ key, id, dto }: UpdateParams) {
    if (dto instanceof UpdateUserDto) {
      const user = this.findOne({ key, id }) as User;
      if (!user) {
        return Constants.USER_ERROR;
      }

      if (user.password !== dto.oldPassword) {
        return Constants.USER_INVALID;
      }

      this.delete({ key, id });
      user.password = dto.newPassword;
      user.version += 1;
      user.updatedAt = Date.now();
      this.users.push(user);

      return user;
    }

    const entity = this.findOne({ key, id });
    if (!entity) {
      return Constants.ENTITY_ERROR;
    }
    this.delete({ key, id });
    const updatedEntity = { ...entity, ...dto };
    this[key].push(updatedEntity);

    return updatedEntity;
  }
  public delete({ key, id }: DeleteParams): string | null {
    const entity = this.findOne({ key, id });
    if (!entity) {
      return null;
    }

    this[key] = this[key].filter((e) => e.id !== id);
    return entity.id;
  }

  public cleanUpTrackAlbumId(id: string) {
    this.tracks.forEach((t) => {
      if (t.albumId === id) {
        t.albumId = null;
      }
    });
  }
  public cleanUpTrackArtistId = (id: string): void => {
    this.tracks.forEach((t) => {
      if (t.artistId === id) {
        t.artistId = null;
      }
    });
  };

  public cleaUpFavorites({ key, id }: FindOneParams) {
    this.favorites[key] = this.favorites[key].filter((el) => el.id !== id);
  }
}

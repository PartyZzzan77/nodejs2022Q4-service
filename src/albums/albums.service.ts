import { Injectable } from '@nestjs/common';
import {
  CreateParams,
  Entity,
  FindOneParams,
  Storage,
} from '../repository/types';
import { RepositoryService } from '../repository/repository.service';

@Injectable()
export class AlbumsService {
  constructor(public repository: RepositoryService) {}
  public find(key: Storage) {
    return this.repository.find(key);
  }
  public findOne({ key, id }: FindOneParams): Entity | null {
    const album = this.repository.findOne({ key, id });

    if (!album) {
      return null;
    }

    return album;
  }
  public create({ key, dto }: CreateParams) {
    return this.repository.create({ key, dto });
  }
  public delete({ key, id }) {
    const albumId = this.repository.delete({ key, id });
    this.repository.cleanUpTrackAlbumId(albumId);
    this.repository.cleanUpFavorites({ key, id: albumId });
    return albumId;
  }
  public update({ key, id, dto }) {
    return this.repository.update({ key, id, dto });
  }
}

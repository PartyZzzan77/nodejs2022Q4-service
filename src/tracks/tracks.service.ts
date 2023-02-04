import { Injectable } from '@nestjs/common';
import { Track } from './Entities/track.entitie';
import {
  CreateParams,
  Entity,
  FindOneParams,
  Storage,
} from '../repository/types';
import { RepositoryService } from '../repository/repository.service';

@Injectable()
export class TracksService {
  constructor(public repository: RepositoryService) {}
  public find(key: Storage): Track[] {
    return this.repository.find(key);
  }
  public findOne({ key, id }: FindOneParams): Entity | null {
    const track = this.repository.findOne({ key, id });

    if (!track) {
      return null;
    }

    return track;
  }
  public create({ key, dto }: CreateParams) {
    return this.repository.create({ key, dto });
  }
  public delete({ key, id }) {
    const trackId = this.repository.delete({ key, id });
    this.repository.cleaUpFavorites({ key, id });
    return trackId;
  }
  public update({ key, id, dto }) {
    return this.repository.update({ key, id, dto });
  }
}

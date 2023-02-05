import { Injectable } from '@nestjs/common';
import { Track } from './Entities/track.entitie';
import { CreateParams, Entity, FindOneParams } from '../repository/types';
import { RepositoryService } from '../repository/repository.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
    public repository: RepositoryService,
  ) {}
  public async find(): Promise<Track[]> {
    return await this.tracksRepository.find();
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
    this.repository.cleanUpFavorites({ key, id });
    return trackId;
  }
  public update({ key, id, dto }) {
    return this.repository.update({ key, id, dto });
  }
}

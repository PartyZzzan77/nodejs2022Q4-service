import { Injectable } from '@nestjs/common';
import { CreateParams, Entity, FindOneParams } from '../repository/types';
import { RepositoryService } from '../repository/repository.service';
import { Repository } from 'typeorm';
import { Artist } from './Entities/atrtist.entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
    public repository: RepositoryService,
  ) {}
  public async find(): Promise<Artist[]> {
    return await this.artistsRepository.find();
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
    const artistId = this.repository.delete({ key, id });
    this.repository.cleanUpTrackArtistId(artistId);
    this.repository.cleanUpFavorites({ key, id: artistId });
    return artistId;
  }
  public update({ key, id, dto }) {
    return this.repository.update({ key, id, dto });
  }
}

import { Injectable } from '@nestjs/common';
import { Track } from './Entities/track.entitie';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddTrackDto } from './dto/add-track.dto';
import { UpdateTrackParams } from './types/update.track.params.interface';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
    private readonly favoritesService: FavoritesService,
  ) {}
  public async find(): Promise<Track[]> {
    return await this.tracksRepository.find();
  }
  public async findOne(id: string): Promise<Track> {
    return await this.tracksRepository.findOneBy({ id });
  }
  public async create(dto: AddTrackDto): Promise<Track> {
    const trackEntity = new Track();
    Object.assign(trackEntity, dto);
    return await this.tracksRepository.save(trackEntity);
  }
  public async delete(id: string): Promise<DeleteResult> {
    await this.favoritesService.delete({ key: 'tracks', id });
    return await this.tracksRepository.delete({ id });
  }
  public async update({ id, dto }: UpdateTrackParams): Promise<Track> {
    const track = await this.findOne(id);

    if (!track) {
      return null;
    }

    Object.assign(track, dto);
    await this.tracksRepository.update(id, track);

    return track;
  }

  public async cleanUpAlbum(id: string): Promise<void> {
    const tracks = await this.find();
    tracks.forEach((t) => {
      if (t.albumId === id) {
        t.albumId = null;
      }
    });

    await this.tracksRepository.save(tracks);
  }
  public async cleanUpArtist(id: string): Promise<void> {
    const artists = await this.find();
    artists.forEach((t) => {
      if (t.artistId === id) {
        t.artistId = null;
      }
    });

    await this.tracksRepository.save(artists);
  }
}

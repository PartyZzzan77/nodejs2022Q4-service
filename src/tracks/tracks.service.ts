import { Injectable } from '@nestjs/common';
import { Track } from './Entities/track.entitie';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddTrackDto } from './dto/add-track.dto';
import { UpdateTrackParams } from './types/update.track.params.interface';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
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
}

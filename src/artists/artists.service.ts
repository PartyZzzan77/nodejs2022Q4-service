import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Artist } from './Entities/atrtist.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { AddArtistDto } from './dto/add-artist.dto';
import { UpdateArtistParams } from './types/update.artist.params.interface';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
  ) {}
  public async find(): Promise<Artist[]> {
    return await this.artistsRepository.find();
  }
  public async findOne(id: string): Promise<Artist> {
    return this.artistsRepository.findOneBy({ id });
  }
  public async create(dto: AddArtistDto): Promise<Artist> {
    const artistEntity = new Artist();
    Object.assign(artistEntity, dto);
    return await this.artistsRepository.save(artistEntity);
  }
  public async delete(id: string): Promise<DeleteResult> {
    return await this.artistsRepository.delete({ id });
  }
  public async update({ id, dto }: UpdateArtistParams): Promise<Artist> {
    const artist = await this.findOne(id);

    if (!artist) {
      return null;
    }

    Object.assign(artist, dto);
    await this.artistsRepository.update(id, artist);

    return artist;
  }
}

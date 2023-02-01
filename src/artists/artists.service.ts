import { Injectable } from '@nestjs/common';
import { Artist } from './Entities/atrtist.entities';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  public getAllArtists(): Artist[] {
    return this.artists;
  }
}

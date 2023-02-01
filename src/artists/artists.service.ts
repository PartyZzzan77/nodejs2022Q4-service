import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './Entities/atrtist.entities';
import { v4 as uuid4 } from 'uuid';
import { AddArtistDto } from './dto/add-artist.dto';
import { Constants } from '../constants';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  public getAllArtists(): Artist[] {
    return this.artists;
  }
  public getOneArtist(id: string): Artist {
    const artist = this.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException(Constants.ARTIST_ERROR);
    }

    return artist;
  }
  public addArtist(artistData: AddArtistDto): Artist {
    const newArtist = {
      id: uuid4(),
      ...artistData,
    };

    this.artists.push(newArtist);

    return newArtist;
  }
}

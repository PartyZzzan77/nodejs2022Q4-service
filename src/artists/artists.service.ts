import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './Entities/atrtist.entities';
import { v4 as uuid4 } from 'uuid';
import { AddArtistDto } from './dto/add-artist.dto';
import { Constants } from '../constants';
import { db } from '../DB/db.service';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = db.artists;

  public getAllArtists(): Artist[] {
    console.log(db.tracks);
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
  public deleteArtist(id: string): string {
    const artist = this.getOneArtist(id);
    this.artists = this.artists.filter((artist) => artist.id !== id);

    db.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    return artist.id;
  }
  public updateArtist(id: string, updateArtistData: UpdateArtistDto): Artist {
    const artist = this.getOneArtist(id);
    this.deleteArtist(id);
    const updatedArtist = { ...artist, ...updateArtistData };
    this.artists.push(updatedArtist);

    return updatedArtist;
  }
}

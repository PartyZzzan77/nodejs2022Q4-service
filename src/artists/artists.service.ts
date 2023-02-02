import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './Entities/atrtist.entities';
import { v4 as uuid4 } from 'uuid';
import { AddArtistDto } from './dto/add-artist.dto';
import { Constants } from '../constants';
import { db } from '../DB/db.service';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  public getAllArtists(): Artist[] {
    return db.artists;
  }
  public getOneArtist(id: string): Artist {
    const artist = db.artists.find((artist) => artist.id === id);

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

    db.artists.push(newArtist);

    return newArtist;
  }
  public deleteArtist(id: string): string {
    const artist = this.getOneArtist(id);
    db.artists = db.artists.filter((artist) => artist.id !== id);

    db.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    db.favorites.artists = db.favorites.artists.filter(
      (a) => a.id !== artist.id,
    );

    return artist.id;
  }
  public updateArtist(id: string, updateArtistData: UpdateArtistDto): Artist {
    const artist = this.getOneArtist(id);
    this.deleteArtist(id);
    const updatedArtist = { ...artist, ...updateArtistData };
    db.artists.push(updatedArtist);

    return updatedArtist;
  }
}

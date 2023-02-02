import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { db } from '../DB/db.service';
import { Favorite } from './Entities/favorite.entities';
import { Constants } from '../constants';

@Injectable()
export class FavoritesService {
  public getAllFavorites(): Favorite {
    return db.favorites;
  }
  public addTrackById(id: string) {
    const track = db.tracks.find((track) => track.id === id);

    if (!track) {
      throw new UnprocessableEntityException(Constants.TRACK_INVALID);
    }

    db.favorites.tracks.push(track);
  }
  public deleteTrackById(id: string) {
    const track = db.tracks.find((track) => track.id === id);
    const favoritesTrack = db.favorites.tracks.find((track) => track.id === id);
    if (!track || !favoritesTrack) {
      throw new NotFoundException(Constants.TRACK_ERROR);
    }

    db.favorites.tracks = db.favorites.tracks.filter((el) => el.id !== id);
  }
  public addAlbumById(id: string) {
    const album = db.albums.find((album) => album.id === id);

    if (!album) {
      throw new UnprocessableEntityException(Constants.ALBUM_INVALID);
    }

    db.favorites.albums.push(album);
  }
  public deleteAlbumById(id: string) {
    const album = db.albums.find((album) => album.id === id);
    const favoritesAlbum = db.favorites.albums.find((a) => a.id === id);

    if (!album || !favoritesAlbum) {
      throw new NotFoundException(Constants.ALBUM_ERROR);
    }

    db.favorites.albums = db.favorites.albums.filter(
      (el) => el.id !== album.id,
    );
  }
  public addArtistById(id: string) {
    const artist = db.artists.find((artis) => artis.id === id);

    if (!artist) {
      throw new UnprocessableEntityException(Constants.ARTIST_INVALID);
    }

    db.favorites.artists.push(artist);
  }
  public deleteArtistById(id: string) {
    const artist = db.favorites.artists.find((art) => art.id === id);
    const favoritesArtist = db.favorites.artists.find((a) => a.id === id);

    if (!artist || !favoritesArtist) {
      throw new NotFoundException(Constants.ARTIST_ERROR);
    }

    db.favorites.artists = db.favorites.artists.filter(
      (el) => el.id !== artist.id,
    );
  }
}

import { Injectable } from '@nestjs/common';
import { db } from '../DB/db.service';
import { Favorite } from './Entities/favorite.entities';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class FavoritesService {
  private favorites: Favorite = db.favorites;

  constructor(
    private readonly trackService: TracksService,
    private readonly albumService: AlbumsService,
    private readonly artistService: ArtistsService,
  ) {}
  public getAllFavorites(): Favorite {
    return this.favorites;
  }
  public addTrackById(id: string) {
    const track = this.trackService.getOneTrack(id);
    this.favorites.tracks = [...this.favorites.tracks, track];
  }
  public addAlbumById(id: string) {
    const album = this.albumService.getOneAlbum(id);
    this.favorites.albums = [...this.favorites.albums, album];
  }
  public addArtistById(id: string) {
    const artist = this.artistService.getOneArtist(id);
    this.favorites.artists = [...this.favorites.artists, artist];
  }
}

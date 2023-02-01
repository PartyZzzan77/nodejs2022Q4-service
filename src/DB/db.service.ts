import { User } from '../users/Entities/user.entitie';
import { Track } from '../tracks/Entities/track.entitie';
import { Artist } from '../artists/Entities/atrtist.entities';
import { Album } from '../albums/Entities/album.entities';
import { Favorite } from '../favorites/Entities/favorite.entities';

class DbService {
  users: User[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  favorites: Favorite = {
    tracks: this.tracks,
    artists: this.artists,
    albums: this.albums,
  };
}

export const db = new DbService();

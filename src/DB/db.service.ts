import { User } from '../users/Entities/user.entitie';
import { Track } from '../tracks/Entities/track.entitie';
import { Artist } from '../artists/Entities/atrtist.entities';
import { Album } from '../albums/Entities/album.entities';

class DbService {
  users: User[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
}

export const db = new DbService();

import { Artist } from '../../artists/Entities/atrtist.entities';
import { Album } from '../../albums/Entities/album.entities';
import { Track } from '../../tracks/Entities/track.entitie';

export class Favorite {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

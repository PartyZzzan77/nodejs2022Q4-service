import { User } from '../users/Entities/user.entitie';
import { Track } from '../tracks/Entities/track.entitie';
import { Album } from '../albums/Entities/album.entities';
import { Artist } from '../artists/Entities/atrtist.entities';
import { AddUserDto } from '../users/dto/add-user.dto';
import { AddTrackDto } from '../tracks/dto/add-track.dto';
import { AddAlbumDto } from '../albums/dto/add-album.dto';
import { AddArtistDto } from '../artists/dto/add-artist.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { UpdateTrackDto } from '../tracks/dto/update-track.dto';
import { UpdateAlbumDto } from '../albums/dto/update-album.dto';
import { UpdateArtistDto } from '../artists/dto/update-artist.dto';

export type Storage = 'users' | 'tracks' | 'albums' | 'artists';
export type Entity = User | Track | Album | Artist;
export type EntitiesCreateDto =
  | AddUserDto
  | AddTrackDto
  | AddAlbumDto
  | AddArtistDto;
export type EntitiesUpdateDto =
  | UpdateUserDto
  | UpdateTrackDto
  | UpdateAlbumDto
  | UpdateArtistDto;
export type FindOneParams = {
  key: Storage;
  id: string;
};
export type CreateParams = {
  key: Storage;
  dto: EntitiesCreateDto;
};
export type UpdateParams = {
  key: Storage;
  id: string;
  dto: EntitiesUpdateDto;
};
export type DeleteParams = {
  key: Storage;
  id: string;
};

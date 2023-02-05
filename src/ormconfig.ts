import { ConnectionOptions } from 'typeorm';
import { User } from './users/Entities/user.entitie';
import { Track } from './tracks/Entities/track.entitie';
import { Album } from './albums/Entities/album.entities';

export const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'tester',
  password: 'tester',
  database: 'music',
  entities: [User, Track, Album],
  synchronize: true,
};

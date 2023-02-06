import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/Entities/user.entitie';
import { Track } from './tracks/Entities/track.entitie';
import { Album } from './albums/Entities/album.entities';
import { Artist } from './artists/Entities/atrtist.entities';

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'tester',
  password: 'tester',
  database: 'music',
  entities: [User, Track, Album, Artist],
  migrations: ['dist/migrations/*.js'],
};

export const dataSource = new DataSource(ormConfig);

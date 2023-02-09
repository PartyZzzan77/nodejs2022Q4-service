import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './src/users/Entities/user.entitie';
import { Track } from './src/tracks/Entities/track.entitie';
import { Album } from './src/albums/Entities/album.entities';
import { Artist } from './src/artists/Entities/atrtist.entities';
import * as process from 'process';
import 'dotenv/config';
import { Favorite } from './src/favorites/Entities/favorite.entities';

export const username = process.env.POSTGRES_USER;
export const password = process.env.POSTGRES_PASSWORD;
export const database = process.env.POSTGRES_DB;
export const migrationConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  username,
  password,
  database,
  entities: [User, Track, Album, Artist, Favorite],
  migrations: [__dirname, 'dist/**/migrations/*.js'],
  synchronize: false,
};

export const dataSource = new DataSource(migrationConfig);

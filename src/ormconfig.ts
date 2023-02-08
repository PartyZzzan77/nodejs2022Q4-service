import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/Entities/user.entitie';
import { Track } from './tracks/Entities/track.entitie';
import { Album } from './albums/Entities/album.entities';
import { Artist } from './artists/Entities/atrtist.entities';
import * as process from 'process';
import 'dotenv/config';

export const username = process.env.POSTGRES_USER;
export const password = process.env.POSTGRES_PASSWORD;
export const database = process.env.POSTGRES_DB;
export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  username,
  password,
  database,
  entities: [User, Track, Album, Artist],
  migrations: ['dist/migrations/*.js'],
  synchronize: true,
};

export const dataSource = new DataSource(ormConfig);

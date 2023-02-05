import { ConnectionOptions } from 'typeorm';
import { User } from './users/Entities/user.entitie';

export const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'tester',
  password: 'tester',
  database: 'music',
  entities: [User],
  synchronize: true,
};

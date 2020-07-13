import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { get } from 'config';

import { isProductionEnv } from '../utils/common.util';
import { DBConfig } from '../models/config/db.config';

const dbConfig: DBConfig = get<DBConfig>('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [__dirname + '../../database/**/*.entity.ts'],
  synchronize: isProductionEnv() ? false : dbConfig.synchronize,
};

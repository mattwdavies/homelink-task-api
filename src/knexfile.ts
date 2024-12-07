import { Knex } from 'knex';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const knexConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }
  },
  migrations: {
    extension: 'ts',
    directory: path.resolve(__dirname, './migrations'),
  }
};

export default knexConfig;

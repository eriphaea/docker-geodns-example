import { config } from 'dotenv';
import { join } from 'path';

config();

export const Config = () => {
  return {
    mariadb: {
      type: 'mariadb',
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_NAME,
      synchronize: false,
      entities: [join(__dirname, '../entities/*.entity.{ts,js}')],
    },
  };
};

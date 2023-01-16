import Base from './base';

export class MySQL extends Base {
  type: 'mysql';

  host: string;
  port: number;

  username: string;
  password: string;
  database: string;

  entities: string[];

  synchronize: boolean;
}

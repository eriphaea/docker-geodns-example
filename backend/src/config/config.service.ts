import { MySQL } from './types/mysql';

import { Config } from './config';

export class ConfigService {
  public readonly mariadb: MySQL;

  constructor() {
    const config = Config();

    this.mariadb = new MySQL(config.mariadb);
  }
}

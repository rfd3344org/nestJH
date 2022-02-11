import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class AppConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const { NODE_ENV } = process.env;
    if (['production', 'staging'].includes(NODE_ENV)) {
      // TODOS
      console.error('todos');
      this.envConfig = {};
    } else {
      this.envConfig = dotenv.parse(fs.readFileSync('.env'));
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  get isDebug(): boolean {
    return this.envConfig.MODE === 'development';
  }

  get mongoDBUri(): string {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_CLUSTER, MONGO_DBNAME } =
      this.envConfig;
    // may need to add current IP on server side (Network Access) if it fail to connect
    return `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DBNAME}?retryWrites=true&w=majority`;
  }

  get sqlDbConfig(): any {
    if (this.isDebug) {
      return {
        dialect: 'sqlite',
        storage: `${this.envConfig.DB_PATH}/${this.envConfig.DB_NAME}`,
        synchronize: true,
        autoLoadModels: true,
      };
    }

    // TODOS
    console.error('todos');
    return {};
  }
}

import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
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
      // this.envConfig = {
      //   MONGODB_URI: process.env.MONGODB_URI,
      // };




    } else {
      this.envConfig = dotenv.parse(fs.readFileSync('.env'));
    }

  }

  get(key: string): string {
    return this.envConfig[key];
  }

  get mongoDBUri(): string {
    const { MONGO_DB_NAME, MONGO_USER, MONGO_PASSWORD } = process.env;
    return `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.giwpq.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;
  }
}
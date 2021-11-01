import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  envLoaded: process.env.AAA_Loaded_env,
  env: process.env.AAA_Loaded_env || 'env',
  name: process.env.APP_NAME,
  url: process.env.APP_URL,
  port: process.env.APP_PORT,
}));
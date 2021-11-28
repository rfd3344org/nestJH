
import { Global, Module } from '@nestjs/common';
import { AppConfigService } from './config.service';

/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Global()
@Module({
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
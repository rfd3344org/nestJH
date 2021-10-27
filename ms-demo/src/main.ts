import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: 'redis-12354.c291.ap-southeast-2-1.ec2.cloud.redislabs.com',
        port: 12354,
        password: 'xTUcdIY2OMcyHya55BCBsXWJbbXwJNJ6',
        },

    },
  );
  app.listen();
}
bootstrap();

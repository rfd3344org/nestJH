import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      // options: {
      //   url: 'redis://localhost:6379',
      //   url: 'redis-12354.c291.ap-southeast-2-1.ec2.cloud.redislabs.com:12354',
      // },
    },
  );
  app.listen();
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


import { setupSwagger } from './libs/swagger';
import { AppModule } from './core/app.module';

async function bootstrap() {
  const { SERVER_PORT } = process.env;

  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  await app.listen(SERVER_PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

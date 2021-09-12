import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { SWAGGER_URL, SERVER_PORT } = process.env;

  const options = new DocumentBuilder()
    .setTitle('called setTitle')
    .setDescription('called setDescription')
    .setVersion('called setVersion')
    // .addTag('called addTag')
    // .addBasicAuth()
    .addBearerAuth()
    // .addOAuth2()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_URL, app, document);

  await app.listen(SERVER_PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { PREFIX, SERVER_PORT, SWAGGER_URL } = process.env;
  app.setGlobalPrefix(PREFIX, {
    exclude: [{ path: '', method: RequestMethod.GET }],
  });
  app.useGlobalInterceptors(new LoggingInterceptor());

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

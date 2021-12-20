import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { RequestMethod } from '@nestjs/common';
import { AppConfigService } from './config/appConfig.service';

async function bootstrap() {
  // setup app
  const app = await NestFactory.create(AppModule);

  const configService =  app.get(AppConfigService);
  const PREFIX = configService.get('PREFIX');
  const SERVER_PORT = configService.get('SERVER_PORT');
  const SWAGGER_URL = configService.get('SWAGGER_URL');

  app.setGlobalPrefix(PREFIX, {
    exclude: [{ path: '', method: RequestMethod.GET }],
  });
  app.useGlobalInterceptors(new LoggingInterceptor());


  // setup swagger
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


  // open port
  await app.listen(SERVER_PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();


import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



export function setupSwagger(app) {
  const { SWAGGER_URL } = process.env;

  const options = new DocumentBuilder()
    .setTitle('called setTitle2222')
    .setDescription('called setDescription')
    .setVersion('called setVersion')
    .addTag('called addTag')
    .addBasicAuth()
    .addBearerAuth()
    .addOAuth2()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_URL, app, document);
}
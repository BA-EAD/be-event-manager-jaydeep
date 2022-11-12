import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { DOCS_PATH } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'], // loging options
  });

  const { PORT } = process.env;

  const port = PORT || 5000;

  // validate incorrect data
  app.useGlobalPipes(new ValidationPipe());

  // set default helmet
  app.use(helmet());

  // set global prefix
  app.setGlobalPrefix('api');

  // add versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  //API enable cros
  app.enableCors();

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Event Management')
    .setDescription('The Event Management API description')
    .setVersion('1.0')
    .addTag('Event Management Apis ')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(DOCS_PATH, app, document);

  await app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

bootstrap();

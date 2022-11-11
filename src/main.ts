import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
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

  await app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

bootstrap();

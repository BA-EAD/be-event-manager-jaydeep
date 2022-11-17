import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { json, urlencoded } from 'body-parser';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { appConfig } from './config';

const rawBodyBuffer = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};
const { MONGODB_URI } = process.env;
@Module({
  imports: [
    AuthModule,
    ApiModule,
    MongooseModule.forRoot(MONGODB_URI),
    MulterModule.register({ dest: './upload' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(json({ verify: rawBodyBuffer })).forRoutes('*');
    consumer.apply(urlencoded({ verify: rawBodyBuffer })).forRoutes('*');
  }
}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ApiModule } from './api/api.module';
// import { ConfigModule } from './config/config.module';
import { PermissionMiddleware } from './auth-new/permission.middleware';
import { AuthModule } from './auth/auth.module';
import { json, urlencoded } from 'body-parser';
import { PreauthMiddleware } from './auth-new/preauth.middleware';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { appConfig } from './config';

const rawBodyBuffer = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};

@Module({
  imports: [
    AuthModule,
    ApiModule,
    MongooseModule.forRoot(appConfig.mongoUrl),
    MulterModule.register({ dest: './upload' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PreauthMiddleware)
      .exclude('/', '/api/v1/login', '/api/v1/api-doc')
      .forRoutes('*');
    consumer.apply(json({ verify: rawBodyBuffer })).forRoutes('*');
    consumer.apply(urlencoded({ verify: rawBodyBuffer })).forRoutes('*');
    consumer.apply(PermissionMiddleware).forRoutes();
  }
}

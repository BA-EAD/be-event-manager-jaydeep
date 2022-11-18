import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { json, urlencoded } from 'body-parser';
import { MailerModule } from '@nestjs-modules/mailer';
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
    MailerModule.forRoot({
      transport:{
        service: appConfig.service,
        host: appConfig.host,
        port: appConfig.port,
        auth: {
            user: appConfig.user,
            pass: appConfig.pass 
        },
     
      },
    
    }),
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

import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventctSchema } from './event.model';
import { JwtService } from '@nestjs/jwt';
@Module({
  controllers: [EventController],
  imports: [
    MongooseModule.forFeature([{ name: 'Event', schema: EventctSchema }]),
  ],
  providers: [EventService, JwtService],
})
export class EventModule {}

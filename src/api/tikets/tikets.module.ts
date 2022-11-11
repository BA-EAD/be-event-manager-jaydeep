import { Module } from '@nestjs/common';
import { TiketsController } from './tikets.controller';
import { TiketsService } from './tikets.service';

import { MongooseModule } from '@nestjs/mongoose';
import { TicketSchema } from './ticket.model';
import { AuthModule } from '../../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
@Module({
  controllers: [TiketsController],
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Ticket', schema: TicketSchema }]),
  ],
  providers: [TiketsService, JwtService],
})
export class TiketsModule {}

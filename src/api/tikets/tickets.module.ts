import { Module } from '@nestjs/common';
import { TiketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

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
  providers: [TicketsService, JwtService],
})
export class TiketsModule {}

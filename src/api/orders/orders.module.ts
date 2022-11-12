import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersSchema } from './order.model';
import { JwtService } from '@nestjs/jwt';
import { TicketSchema } from '../tickets/ticket.model';
import { TiketsModule } from '../tickets/tickets.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Orders', schema: OrdersSchema },
      { name: 'Tickets', schema: TicketSchema },
    ]),
    TiketsModule,
  ],
  providers: [OrdersService, JwtService],
  controllers: [OrdersController],
})
export class OrdersModule {}

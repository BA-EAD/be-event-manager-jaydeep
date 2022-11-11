import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersSchema } from './order.model';
import { JwtService } from '@nestjs/jwt';
import { EventctSchema } from 'src/api/event/event.model';
import { TicketsService } from '../tikets/tickets.service';
import { TiketsModule } from '../tikets/tickets.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Orders', schema: OrdersSchema },
      { name: 'Event', schema: EventctSchema },
    ]),
    TiketsModule,
  ],
  providers: [TicketsService, OrdersService, JwtService],
  controllers: [OrdersController],
  exports: [TicketsService],
})
export class OrdersModule {}

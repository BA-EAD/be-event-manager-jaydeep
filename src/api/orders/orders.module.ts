import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersSchema } from './order.model';
import { JwtService } from '@nestjs/jwt';
import { EventctSchema } from 'src/api/event/event.model';
@Module({
  controllers: [OrdersController],
  imports: [
    MongooseModule.forFeature([
      { name: 'Orders', schema: OrdersSchema },
      { name: 'Event', schema: EventctSchema },
    ]),
  ],
  providers: [OrdersService, JwtService],
})
export class OrdersModule {}

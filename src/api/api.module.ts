import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { TiketsModule } from './tikets/tikets.module';
import { OrdersModule } from './orders/orders.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, EventModule, TiketsModule, OrdersModule, RolesModule],
})
export class ApiModule {}

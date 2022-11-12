import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Req,
  Res,
  UseGuards,
  Injectable,
} from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators';
import { Response } from 'express';
import { JoiValidationPipe } from 'src/auth/joi.validation.pipe';
import { JwtAuthGuard } from '../../auth/jwt-auth-guard';
import { FamilyRole } from '../../auth/role.enum';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { TicketsService } from '../tickets/tickets.service';
import { createOrderScema } from './Order.schema';
import { OrdersService } from './orders.service';

@Controller({
  path: 'order',
  version: '1',
})
@Injectable()
export class OrdersController {
  constructor(
    private readonly service: OrdersService,
    private readonly ticketService: TicketsService,
  ) {}

  // create Order
  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(createOrderScema))
  async addNew(
    @Req() req,
    @Body() orderData,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const user: any = await this.service.getUserFromToken(
        req.headers.authorization?.split(' ')[1] || '',
      );
      const ticket: any = await this.ticketService.getById(orderData.ticket);
      if (ticket && ticket.event && ticket.event.end_date > new Date()) {
        if (ticket.quantity >= orderData.quantity) {
          const order: any = {
            owner: user.id,
            ticket: ticket._id,
            date: new Date(),
            quantity: orderData.quantity,
            total_price: ticket.price * orderData.quantity,
          };
          const placeOrder = await this.service.create(order);
          ticket.quantity = ticket.quantity - orderData.quantity;
          await this.ticketService.update(ticket);
          res.status(200).json(placeOrder);
        }
      } else {
        res.status(200).json({ message: 'Event is finished' });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }
  }

  // get all Order list
  @Get()
  @UseGuards(JwtAuthGuard)
  // @Roles(FamilyRole.Admin, { list: true })
  async loadAll(@Req() req, @Res() res: Response): Promise<any> {
    try {
      const orders = await this.service.getAll();
      res.json({ data: orders });
    } catch (error: any) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }
  }

  // get order by id
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(FamilyRole.Admin, { list: true })
  async getrByid(@Param('id') id: string, @Res() res: Response): Promise<any> {
    try {
      const order = await this.service.getById(id);
      res.json({ item: order });
    } catch (error: any) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }
  }
}

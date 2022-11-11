import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Put,
  Delete,
  Body,
  NotFoundException,
  BadGatewayException,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators';
import { Response } from 'express';
import { JoiValidationPipe } from 'src/auth/joi.validation.pipe';
import { JwtAuthGuard } from '../../auth/jwt-auth-guard';
import { FamilyRole } from '../../auth/role.enum';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { createOrderScema } from './Order.schema';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  // create Order
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(FamilyRole.Admin, { create: true })
  @UsePipes(new JoiValidationPipe(createOrderScema))
  async addNew(@Body() orderData, @Res() res: Response): Promise<any> {
    // var owner: string = bodyData.owner;
    // var event_tickets: string = bodyData.event_tickets;
    // var date: Date = bodyData.date;
    // var total_price: number = bodyData.total_price;
    try {
      const placeOrder = await this.service.create(orderData);
      res.status(200).json(placeOrder);
    } catch (error: any) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }
  }

  // get all Order list
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(FamilyRole.Admin, { list: true })
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
  @UseGuards(JwtAuthGuard, RolesGuard)
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

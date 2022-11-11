import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Orders } from './order.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Orders') private readonly OrderModule: Model<Orders>,
    @InjectModel('Event') private readonly EventModule: Model<Event>,
  ) {}

  // create order
  async create(order: Orders): Promise<Orders> {
    const newOrder = new this.OrderModule(order);
    const prdct: any = await newOrder.save();
    return prdct;
  }

  // get all order list
  async getAll() {
    return await this.OrderModule.find().exec();
  }

  // get order by id
  async getById(id: string): Promise<Orders> {
    return await this.OrderModule.findOne({ _id: id }).exec();
  }
}

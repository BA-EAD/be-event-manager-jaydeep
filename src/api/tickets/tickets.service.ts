import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket } from './ticket.model';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel('Ticket') private readonly TicketModule: Model<Ticket>,
  ) {}

  // create ticket
  async create(ticket: Ticket): Promise<Ticket> {
    const newEvent = new this.TicketModule(ticket);
    const save: any = await newEvent.save();
    return save;
  }

  // update ticket
  async update(ticket: Ticket): Promise<Ticket> {
    const save: any = await this.TicketModule.updateOne(
      { _id: ticket._id },
      { $set: ticket },
    );
    return save;
  }

  // get all ticket list
  async getAll() {
    return await this.TicketModule.find().exec();
  }

  // get ticket by id
  async getById(id: string): Promise<Ticket> {
    return await this.TicketModule.findOne({ _id: id })
      .populate('event')
      .exec();
  }
}

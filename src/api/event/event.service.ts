import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Events } from './event.model';

@Injectable()
export class EventService {
  constructor(
    @InjectModel('Event') private readonly EventModule: Model<Events>,
  ) {}

  // create Event
  async addEvent(event: Event): Promise<Events> {
    const newEvent = new this.EventModule(event);
    return await newEvent.save();
  }

  // get all events
  async getAllEvents() {
    return await this.EventModule.find().exec();
  }

  // get event by id
  async getById(id: string): Promise<Events> {
    return await this.EventModule.findOne({ _id: id }).exec();
  }
}

import * as mongoose from 'mongoose';

export const TicketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
});

export interface Ticket extends mongoose.Document {
  _id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  event_id: string;
}

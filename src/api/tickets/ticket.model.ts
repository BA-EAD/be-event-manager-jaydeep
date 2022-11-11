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

  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },

  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
    type: Date,
    required: false,
  },
});

export interface Ticket extends mongoose.Document {
  _id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  event: string;
}

import * as mongoose from 'mongoose';

export const OrdersSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ticket_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
  date: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
});

export interface Orders extends mongoose.Document {
  _id?: string;
  owner: string;
  ticket_id: string;
  date: Date;
  quantity: number;
  total_price: number;
}

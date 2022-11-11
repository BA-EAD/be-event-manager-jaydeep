import * as mongoose from 'mongoose';

export const EventctSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },

  poster: {
    type: String,
    required: false,
  },

  start_date: {
    type: Date,
    required: true,
  },

  end_date: {
    type: Date,
    required: true,
  },
});

export interface Events extends mongoose.Document {
  _id?: string;
  slug: string;
  name: string;
  description: string;
  poster: string;
  start_date: string;
  end_date: string;
}

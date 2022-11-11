import * as mongoose from 'mongoose';

export const EventctSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
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

  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
    type: Date,
    required: false,
  },
});

export interface Events extends mongoose.Document {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  poster: string;
  start_date: string;
  end_date: string;
}

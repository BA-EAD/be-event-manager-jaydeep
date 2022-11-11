import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  mobile: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: false,
  },
  nationality: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: false,
  },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Roles' },
});

export interface User extends mongoose.Document {
  _id?: string;
  username?: string;
  mobile?: number;
  email?: string;
  password?: string;
  full_name?: string;
  nationality?: string;
}

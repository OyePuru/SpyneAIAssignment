import mongoose, { Document } from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: false,
  },
  phoneNumber: {
    type: Number,
    unique: true,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const User = mongoose.model<Document & User>('User', schema);

export interface User extends Document {
  name: string;
  email?: string;
  phoneNumber?: number;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

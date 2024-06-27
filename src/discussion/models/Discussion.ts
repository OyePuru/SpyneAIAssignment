import mongoose, { Document } from 'mongoose';

const schema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  media: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'media',
  }
}, { timestamps: true });

export const Discussion = mongoose.model<Document & Discussion>('discussion', schema);

export interface Discussion extends Document {
  text: string;
  createdBy: mongoose.Schema.Types.ObjectId;
  media: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
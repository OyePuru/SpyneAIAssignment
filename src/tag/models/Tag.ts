import mongoose, { Document } from 'mongoose';

const schema = new mongoose.Schema({
  name: { 
    type: String, 
    trim: true 
  },
  timeUsed: { 
    type: Number, 
    default: 0 
  },
  startedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
}, { timestamps: true });

schema.index({ name: 1 });

export const Tag = mongoose.model<Document & Tag>('tag', schema);

export interface Tag extends Document {
  name: string;
  timeUsed: number;
  startedBy: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
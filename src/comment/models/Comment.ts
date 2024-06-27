import mongoose, { Document } from 'mongoose';

const schema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  discussion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'discussion'
  }
}, { timestamps: true });

export const Comment = mongoose.model<Document & Comment>('comment', schema);

export interface Comment extends Document {
  content: string;
  user: mongoose.Schema.Types.ObjectId;
  discussion: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

import mongoose, { Document } from 'mongoose';

const schema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
}, { timestamps: true });

export const Comment = mongoose.model<Document & Comment>('comment', schema);

export interface Comment extends Document {
  content: string;
  user: mongoose.Schema.Types.ObjectId;
  post: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

import mongoose, { Document } from 'mongoose';

const schema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  follower_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
}, { timestamps: true });

export const Follow = mongoose.model<Document & Follow>('follow', schema);

export interface Follow extends Document {
  user_id: mongoose.Schema.Types.ObjectId;
  follower_id: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

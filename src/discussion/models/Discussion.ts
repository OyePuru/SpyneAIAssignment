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
  },
  tags: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'tag'
	}],
  viewCount: {
    type: Number,
    default: 0,
  },
  likesCount: {
    type: Number,
    default: 0
  },
  comments : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'comment'
    }
  ]
}, { timestamps: true });

export const Discussion = mongoose.model<Document & Discussion>('discussion', schema);

export interface Discussion extends Document {
  text: string;
  createdBy: mongoose.Schema.Types.ObjectId;
  media: mongoose.Schema.Types.ObjectId;
  tags: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
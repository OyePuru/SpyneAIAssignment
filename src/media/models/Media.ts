import mongoose, { Document } from 'mongoose';

const schema = new mongoose.Schema({
  mediaType: {
    type: String,
    enum: ['discussion'],
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  url: {
    type: String,
    default: ''
  },
  base64data: { 
    type: String, 
    default: '' 
  }, // we'll be using this for the demo base64 string
  mimeType: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export const Media = mongoose.model<Document & Media>('media', schema);

export interface Media extends Document {
  mediaType: 'discussion';
  createdBy: mongoose.Schema.Types.ObjectId;
  url: string;
  base64data: string;
  mimeType: string;
  createdAt: Date;
  updatedAt: Date;
}
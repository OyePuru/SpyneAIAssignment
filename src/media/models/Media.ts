import mongoose, { Document } from 'mongoose';

const schema = new mongoose.Schema({
  mediaReferTo: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'mediaType'
  },
  mediaType: {
    type: String,
    enum: ['discussion'],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
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
    default: ''
  }
}, { timestamps: true });

export const Media = mongoose.model<Document & Media>('media', schema);

export interface Media extends Document {
  mediaReferTo: mongoose.Schema.Types.ObjectId;
  mediaType: 'discussion';
  createdBy: mongoose.Schema.Types.ObjectId;
  url: string;
  base64data: string;
  mimeType: string;
  createdAt: Date;
  updatedAt: Date;
}
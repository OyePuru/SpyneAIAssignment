import mongoose from "mongoose";

export interface ICreateMedia {
  mediaType: string;
  createdBy: mongoose.Types.ObjectId,
  url?: string;
  base64data?: string;
  mimeType: string;
  size: number;
}
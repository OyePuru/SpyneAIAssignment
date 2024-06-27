import mongoose from "mongoose";

export interface IDiscussion {
  text: string;
  createdBy: mongoose.Types.ObjectId,
  media?: mongoose.Types.ObjectId
  tags: mongoose.Types.ObjectId[],
};
import mongoose from "mongoose";

export interface ICreateTag {
  name: string;
  startedBy: mongoose.Types.ObjectId;
}
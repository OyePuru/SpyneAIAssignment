import mongoose from "mongoose";
import { IUpdateUser, IUser } from "../interface/user.interface";
import { User } from "../models/User";
import { Pagination } from "../../utility/interfaces/pagination.interface";

export class UserRepository {
  create = async (data: IUser) => {
    const user = new User(data);
    await user.save(); 
  }

  findByIdAndUpdate = async (id: mongoose.Types.ObjectId, data: IUpdateUser) => {
    return await User.findByIdAndUpdate(id,
      {
        $set: { ...data }
      },
      { new: true }
    );
  }

  findUserByEmail = async (email: string) => {
    return await User.findOne({ email });
  }

  findById = async (id: any) => {
    return await User.findById(id);
  }

  findByIdAndDelete = async (id: any) => {
    return await User.findByIdAndDelete(id);
  }

  userList = async (paginationOptions: Pagination) => {
    return await User.find().skip(paginationOptions.skip).limit(paginationOptions.limit).exec();
  }

  searchUserByName = async (name: string) => {
    return await User.find({
      name: { $regex: name, $options: 'i' }
    });
  }
}
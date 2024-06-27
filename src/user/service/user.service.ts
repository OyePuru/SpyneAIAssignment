import * as bcrypt from 'bcrypt';
import { IDeleteUser, IUpdateUser } from "../interface/user.interface";
import { UserRepository } from "../repository/user.repository";
import { User } from '../models/User';
import { Pagination } from '../../utility/interfaces/pagination.interface';

export class UserService {
  private userRepository: UserRepository
  constructor () {
    this.userRepository = new UserRepository();
  }

  update = async (id: any, data: IUpdateUser) => {
    try {
      const phoneNumber = data.phoneNumber?.toString();
      if (phoneNumber && phoneNumber.length !== 10) {
        return Promise.reject({ err_code: 400, message: "Phone number must be exactly 10 digits." });
      }
      return await this.userRepository.findByIdAndUpdate(id, data);
    } catch (err: any) {
      console.error("Error in update: UserService:", err);
      return Promise.reject({ message: "Internal server error." });
    }
  }

  delete = async (user: User, data: IDeleteUser) => {
    const isPasswordCorrect = bcrypt.compareSync(data.confirmPassword, user.password);
    if (!isPasswordCorrect) return Promise.reject({ err_code: 400, message: "Password didn't matched" });

    await this.userRepository.findByIdAndDelete(user._id);
  }

  userList = async (body: any) => {
    const paginationOptions: Pagination = {
      limit: body.limit ?? 10,
      skip: body.skip ?? 0
    }
    return this.userRepository.userList(paginationOptions);
  }

  searchUserByName = async (name: string) => {
    if (name.length < 3){
      return Promise.reject({ err_code: 400, message: "Search length must be greater than 2" });
    }
    return this.userRepository.searchUserByName(name);
  }
}
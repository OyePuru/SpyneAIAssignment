import * as bcrypt from 'bcrypt';
import { IDeleteUser, IUpdateUser } from "../interface/user.interface";
import { UserRepository } from "../repository/user.repository";
import { User } from '../models/User';
import { Pagination } from '../../utility/interfaces/pagination.interface';
import { FollowRepository } from '../../follow/repositlory/follow.repository';

export class UserService {
  private userRepository: UserRepository
  private followRepository: FollowRepository
  constructor () {
    this.userRepository = new UserRepository();
    this.followRepository = new FollowRepository();
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
      return Promise.reject({ message: err.message });
    }
  }

  delete = async (user: User, data: IDeleteUser) => {
    try {
      const isPasswordCorrect = bcrypt.compareSync(data.confirmPassword, user.password);
      if (!isPasswordCorrect) return Promise.reject({ err_code: 400, message: "Password didn't matched" });
      await this.userRepository.findByIdAndDelete(user._id);
    } catch (err: any) {
      console.error("Error in delete: UserService:", err);
      return Promise.reject({ message: err.message });
    }
  }

  userList = async (body: any) => {""
    try {
      const paginationOptions: Pagination = {
        limit: body.limit ?? 10,
        skip: body.skip ?? 0
      }
      return this.userRepository.userList(paginationOptions);
    } catch (err: any) {
      console.error("Error in userList: UserService:", err);
      return Promise.reject({ message: err.message });
    }
  }

  searchUserByName = async (name: string) => {
    if (name.length < 3){
      return Promise.reject({ err_code: 400, message: "Search length must be greater than 2" });
    }
    return this.userRepository.searchUserByName(name);
  }

  follow = async (loginUser: User, follow_userId: any) => {
    try {
      const isUserPresent = this.userRepository.findById(follow_userId);
      if (!isUserPresent) {
        return Promise.reject({ err_code: 400, message: 'User not present.' });
      }
      await this.followRepository.follow(follow_userId, loginUser._id);
    } catch (err: any) {
      console.error("Error in update: UserService:", err);
      return Promise.reject({ message: err.message });
    }
  }

  unfollow = async (loginUser: User, follow_userId: any) => {
    try {
      await this.followRepository.unfollow(follow_userId, loginUser._id);
    } catch (err: any) {
      console.error("Error in update: UserService:", err);
      return Promise.reject({ message: err.message });
    }
  }
}
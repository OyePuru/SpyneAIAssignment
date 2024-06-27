import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { IUser } from "../../user/interface/user.interface";
import { UserRepository } from "../../user/repository/user.repository";
import { passwordRegex } from "../../utility/constants";
import { ISignIn } from "../interface/auth.interface";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  signup = async (userDetails: IUser) => {
    try {
      const phoneNumber = userDetails.phoneNumber.toString();
      if (phoneNumber.length !== 10) {
        return Promise.reject({ err_code: 400, message: "Phone number must be exactly 10 digits." });
      }

      const isValidPassword = passwordRegex.test(userDetails.password);
      if (!isValidPassword) {
        return Promise.reject({ err_code: 400, message: "Password must contain alphabet, number and special character" });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(userDetails.password, salt);
      userDetails.password = hashedPassword;
      await this.userRepository.create(userDetails);
     } catch (err: any) {
      console.error("Error in signup: AuthService:", err);
      return Promise.reject({ message: "Internal server error." });
    }
  }

  signin = async (authCredentials: ISignIn) => {
    const emailPasswordUnmatched = { err_code: 400, message: "Email/Password didn't matched" };
    try {
      const user = await this.userRepository.findUserByEmail(authCredentials.email);
      if (!user) return Promise.reject(emailPasswordUnmatched);
  
      const isPasswordCorrect = bcrypt.compareSync(authCredentials.password, user.password);
      if (!isPasswordCorrect) return Promise.reject(emailPasswordUnmatched);

      const secretKey: string = process.env.SECRET!;
      const token = jwt.sign({ _id: user._id }, secretKey, { algorithm: "HS256", expiresIn: "30d" });
      return token;
    } catch (err: any) {
      console.error("Error in signin: AuthService", err);
      return Promise.reject(emailPasswordUnmatched);
    }
  }
}

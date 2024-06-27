import { extend } from "joi";

export interface IUser {
  name: string;
  email: string;
  phoneNumber: Number;
  password: string;
}

export interface IUpdateUser {
  name?: string;
  email?: string;
  phoneNumber?: Number;
}

export interface IDeleteUser {
  confirmPassword: string;
}
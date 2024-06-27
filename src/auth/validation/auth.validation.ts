import Joi from 'joi';
import { IUser } from "../../user/interface/user.interface";

export const SignUpValidation = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.number().required(),
    password: Joi.string().min(8).required()
  });

  return schema.validate(data, { abortEarly: true });
}

export const SignInValidation = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  });

  return schema.validate(data, { abortEarly: true });
}
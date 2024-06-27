import Joi from 'joi';

export const UpdateUserValidation = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phoneNumber: Joi.number().optional(),
  });

  return schema.validate(data, { abortEarly: true });
}

export const DeleteUserValidation = (data: any) => {
  const schema = Joi.object({
    confirmPassword: Joi.string().required()
  });

  return schema.validate(data, { abortEarly: true });
}

export const UserListValidation = (data: any) => {
  const schema = Joi.object({
    limit: Joi.number().optional(),
    skip: Joi.number().optional()
  });

  return schema.validate(data, { abortEarly: true });
}

export const SearchUserValidation = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().required()
  });

  return schema.validate(data, { abortEarly: true });
}
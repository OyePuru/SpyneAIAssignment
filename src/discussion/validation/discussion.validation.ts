import Joi from "joi";

export const CreateDiscussionValidation = (data: any) => {
  const schema = Joi.object({
    text: Joi.string().required().min(3).required(),
    tags: Joi.array().items(Joi.string().min(3)).required(),
  });
  return schema.validate(data, { abortEarly: true });
}

export const UpdateDiscussionValidation = (data: any) => {
  const schema = Joi.object({
    text: Joi.string().required().min(3).optional(),
    tags: Joi.array().items(Joi.string().min(3)).optional(),
  });
  return schema.validate(data, { abortEarly: true });
}
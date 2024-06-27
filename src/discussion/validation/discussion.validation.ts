import Joi from "joi";

export const CreateDiscussionValidation = (data: any) => {
  const schema = Joi.object({
    text: Joi.string().email().required(),
    tags: Joi.array().items(Joi.string()),
  });
  return schema.validate(data, { abortEarly: true });
}
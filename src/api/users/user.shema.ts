import * as joi from 'joi';

export const createUserScema = joi.object({
  username: joi.string().required(),
  mobile: joi.number(),
  email: joi.string().required().email(),
  password: joi.string().required(),
  full_name: joi.string(),
  nationality: joi.string(),
});

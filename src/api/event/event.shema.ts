import * as joi from 'joi';

export const createEventScema = joi.object({
  name: joi.string().required(),
  slug: joi.string().required(),
  description: joi.string(),
  poster: joi.string(),
  start_date: joi.string().required(),
  end_date: joi.string().required(),
});

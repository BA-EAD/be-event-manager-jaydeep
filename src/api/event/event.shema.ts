import * as joi from 'joi';

export const createEventScema = joi.object({
  name: joi.number().required(),
  slug: joi.string().required(),
  description: joi.string(),
  poster: joi.string(),
  start_date: joi.date().required(),
  end_date: joi.date().required(),
});

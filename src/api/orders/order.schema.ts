import * as joi from 'joi';

export const createOrderScema = joi.object({
  ticket: joi.string().required(),
  quantity: joi.number().required(),
});

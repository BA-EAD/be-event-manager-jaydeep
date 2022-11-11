import * as joi from 'joi';

export const createTicketScema = joi.object({
  name: joi.string().required(),
  description: joi.string(),
  price: joi.number().required(),
  quantity: joi.number().required(),
  event: joi.string().required(),
});

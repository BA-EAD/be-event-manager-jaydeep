import * as joi from 'joi';

export const createOrderScema = joi.object({
  owner: joi.string(),
  ticket_id: joi.string(),
  date: joi.date(),
  quantity: joi.number().required(),
  total_price: joi.number().required(),
});

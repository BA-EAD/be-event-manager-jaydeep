import * as joi from 'joi';

export const emailSchema=joi.object({
    toemail:joi.string().required().email().allow(null,false),
    password:joi.string().required().allow(null,false)
  
})
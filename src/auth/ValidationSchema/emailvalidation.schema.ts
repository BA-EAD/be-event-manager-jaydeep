import * as joi from 'joi';

export const emailValidationSchema=joi.object({
    toemail:joi.string().required().email().allow(null,false)
  
})
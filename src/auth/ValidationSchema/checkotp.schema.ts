import * as joi from 'joi';

export const checkOtpSchema=joi.object({
    toemail:joi.string().required().email().allow(null,false),
    otp:joi.number().required().allow(null,false)
  
})
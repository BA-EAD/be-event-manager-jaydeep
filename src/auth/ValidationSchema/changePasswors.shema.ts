import * as joi from 'joi';

export const changePassSchema=joi.object({
    email:joi.string().required().email().allow(null,false),
    oldPassword:joi.string().required().allow(null,false),
    newPassword:joi.string().required().allow(null,false)
  
})
import * as joi from 'joi';

export const loginUserSchema=joi.object({
    email:joi.string().email().required().allow(null,false),
    password:joi.string().required().allow(null,false)
   
})
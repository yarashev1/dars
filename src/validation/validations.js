import Joi from "joi"
class validations{

    registerSchema = Joi.object({
        username:Joi.string().alphanum().required(),
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required()
    })
    loginSchema = Joi.object({
        username:Joi.string().alphanum().min(3).max(20).required(),
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required()
    })
}


export default new validations()
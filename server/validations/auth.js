const Joi = require('joi')


exports.clientRegistrationValidation = (data) => {
     const schema = Joi.object({
          firstName: Joi.string().required(),
          lastName: Joi.string().required(),
          cin: Joi.string().required(),
          rib: Joi.number(),
          email: Joi.string().required().email(),
          password: Joi.string().required().min(5).max(50),
          phone: Joi.string().required().min(10).max(10)
     })

     return schema.validate(data)
}


exports.ownerRegisterValidation = (data) => {
     const schema = Joi.object({
          firstName: Joi.string().required(),
          lastName: Joi.string().required(),
          cin: Joi.string().required(),
          email: Joi.string().required().email(),
          password: Joi.string().required().min(5).max(50),
          rib: Joi.string().required().min(24).max(24),
          phone: Joi.string().required().min(10).max(10)
     })

     return schema.validate(data)
}


exports.LoginValidation = (data) => {
     const schema = Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required().min(5).max(50)
     })

     return schema.validate(data)
}
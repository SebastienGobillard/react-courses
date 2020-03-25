//VALIDATION
const Joi = require ('@hapi/joi');

//Register Validation
const registerValidation = (data) => {
    console.log('dans la validation data.name', data.name)
    const schema = {
        name: Joi.string()
            .min(3)
            .required(),
        surname: Joi.string()
            .min(3)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(8)
            .required()
    };
    return Joi.validate(data.user, schema);
};

const loginValidation = (data) => {
    const schema = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(8)
            .required()
    };
    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
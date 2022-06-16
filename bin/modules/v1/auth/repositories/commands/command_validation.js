const joi = require('joi');

const register = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required()
});

module.exports = {
    register
};
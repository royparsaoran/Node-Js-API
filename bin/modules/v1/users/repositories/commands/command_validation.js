const joi = require('joi');

const insert = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required()
});

const update = joi.object({
    id: joi.number().required(),
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required()
});

module.exports = {
    insert,
    update
};
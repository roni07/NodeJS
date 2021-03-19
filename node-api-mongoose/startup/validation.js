const Joi = require('joi');

module.exports = function () {
    Joi.objectId = require('joi-objectid')(Joi); // It is used for mongo id validation
}
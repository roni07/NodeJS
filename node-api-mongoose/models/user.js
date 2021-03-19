const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () { // we can not use here arrow function because arrow function does not have `this`
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('secretKey'));
    // return {token: jwt.sign({_id: this._id}, config.get('secretKey'))}; return object instead of pain string
}

const User = mongoose.model('User', userSchema);

const userValidation = user => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    });

    return schema.validate(user);
}

exports.userValidation = userValidation;
exports.User = User;

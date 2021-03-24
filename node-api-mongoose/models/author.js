const Joi = require('joi');
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
   name: {
       type: String,
       minlength: 3,
       maxlength: 50,
       required: true
   },
   age: {
       type: Number,
       min: 20,
       required: true
   }
});

const Author = mongoose.model('Author', authorSchema);

const authorValidation = author => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        age: Joi.number().min(20).required()
    });

    return schema.validate(author);
}

exports.authorValidation = authorValidation;
exports.authorSchema = authorSchema;
exports.Author = Author;

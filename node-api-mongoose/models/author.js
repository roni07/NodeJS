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

exports.authorSchema = authorSchema;
exports.Author = Author;

const mongoose = require('mongoose');
const {authorSchema} = require('../models/author');

const Book = mongoose.model('Book', new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: authorSchema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    }
}));

exports.Book = Book;

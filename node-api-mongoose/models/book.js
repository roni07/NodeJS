const mongoose = require('mongoose');

const Book = mongoose.model('Book', new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    }
}));

exports.Book = Book;

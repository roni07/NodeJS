const _ = require('lodash');
const {Book} = require('../models/book');
const {Author} = require('../models/author');
const express = require('express');
const router = express.Router();

router.get('/list', async (req, res) => {
    const books = await Book.find()
        .populate('author', 'name -_id').select('title -_id');

   return res.status(200).send(books);
});

router.post('/create/:id', async (req, res) => {

    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).send(`The author with the given ID ${req.params.id} not found`)

    let book = new Book({
        title: req.body.title,
        author: author._id
    });

    book = await book.save();

    return res.status(201).send(book);
});

router.put('/update/:id', async (req, res) => {

    const author = await Author.findById(req.body.author._id);
    if (!author) return res.status(404).send('Author not found');

    const book = await Book.findByIdAndUpdate(req.params.id, {
       title: req.body.title,
       author: author._id
   }, {new: true});

    return res.status(200).send(book);
});

module.exports = router;
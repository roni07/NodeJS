const _ = require('lodash');
const {Author, authorValidation} = require('../models/author');
const express = require('express');
const router = express.Router();

router.get('/list', async (req, res) => {
   const authors = await Author.find();
   return res.status(200).send(authors);
});

router.post('/create', async (req, res) => {
   const {error} = authorValidation(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   let author = new Author(_.pick(req.body, ['name', 'age']));
   author = await author.save();

   return res.status(201).send(author);
});

router.put('/update/:id', async (req, res) => {
   const {error} = authorValidation(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const author = await Author.findByIdAndUpdate(req.params.id, _.pick(req.body, ['name', 'age']), {new: true});
   if (!author) return res.status(404).send(`The author with the given ID ${req.params.id} not found`);

   return res.status(200).send(author);
});

module.exports = router;

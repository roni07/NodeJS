const {Author} = require('../models/author');
const express = require('express');
const router = express.Router();

router.get('/list', async (req, res) => {
   const authors = await Author.find();
   return res.status(200).send(authors);
});

module.exports = router;

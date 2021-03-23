const paginationMiddleWare = require('../middleware/pagination-middleware');
const auth = require('../middleware/auth-middleware');
const admin = require('../middleware/admin-middleware');
const {Genre} = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/list', auth, paginationMiddleWare(Genre), async (req, res) => {
    res.json(res.pagination);
});

router.post('/create', auth, async (req, res) => {
    let genre = new Genre({name: req.body.name});
    genre = await genre.save();
    res.status(201).send(genre);
});

router.put('/update/:id', async (req, res) => {
    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name},
        {new: true});

    if (!genre) return res.status(404).send(`The genre with the given ID ${req.params.id} not found`);

    return res.status(200).send(genre);
});

router.delete('/delete/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send(`The genre with the given ID ${req.params.id} not found`);

    return res.status(200).send(`Successfully deleted genre ${genre.id}`);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send(`The genre with the given ID ${req.params.id} not found`);

    return res.status(200).send(genre);
});

module.exports = router;

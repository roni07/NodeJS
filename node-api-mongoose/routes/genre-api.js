const {Genre} = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/list', async (req, res) => {
    try {
        const genres = await Genre.find().sort('name');
        return res.status(200).send(genres);
    } catch (err) {
        console.log(err.message);
    }
});

router.post('/create', async (req, res) => {
    try {
        let genre = new Genre({name: req.body.name});
        genre = await genre.save();
        res.status(201).send(genre);
    } catch (err) {
        console.log(err.message);
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        // const {error} = validateGenre(req.body);
        // if (error) return res.status(400).send(error.details[0].message);
        const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name},
            {new: true});

        if (!genre) return res.status(404).send(`The genre with the given ID ${req.params.id} not found`);

        return res.status(200).send(genre);
    } catch (err) {
        console.log(err.message);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const genre = await Genre.findByIdAndRemove(req.params.id);
        if (!genre) return res.status(404).send(`The genre with the given ID ${req.params.id} not found`);

        return res.status(200).send(`Successfully deleted genre ${genre.id}`);
    } catch (err) {
        console.log(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) return res.status(404).send(`The genre with the given ID ${req.params.id} not found`);

        return res.status(200).send(genre);
    } catch (err) {
        console.log(err.message);
    }
});

/*const validateGenre = genre => { // custom validation
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}*/

module.exports = router;

const {Movie, validateMovie} = require('../models/movie');
const {Genre} = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/list', async (req, res) => {
    try {
        const movies = await Movie.find();
        return res.status(200).send(movies);
    } catch (err) {
        console.log(err.message);
        return res.send(err.message);
    }
});

router.post('/create', async (req, res) => {
    try {
        const {error} = validateMovie(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const genre = await Genre.findById(req.body.genreId);
        if (!genre) return res.status(404).send(`Genre not found with id ${req.body.genreId}`);

        let movie = new Movie({
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        });

        movie = await movie.save();

        return res.status(201).send(movie);
    } catch (err) {
        console.log(err.message);
        return res.send(err.message);
    }
});

module.exports = router;

const {Rental, validateRental} = require('../models/rental');
const {Customer} = require('../models/customer');
const {Movie} = require('../models/movie');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/list', async (req, res) => {
    try {
        const rentals = await Rental.find();
        return res.status(200).send(rentals);
    } catch (error) {
        return res.send(error.message);
    }
});

router.post('/create', async (req, res) => {
    try {
        const {error} = validateRental(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const customer = await Customer.findById(req.body.customerId);
        if (!customer) return res.status(404).send(`Customer not found with id ${req.body.customerId}`);

        const movie = await Movie.findById(req.body.movieId);
        if (!movie) return res.status(404).send(`Movie not found with id ${req.body.movieId}`);

        if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock');

        let rental = new Rental({
            customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phone
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }
        });

        new Fawn.Task() // It is used for Transaction / Alternatively we can use mongo 2 phase commit
            .save('rentals', rental) // Transaction -> if one operation execute and another not then it will reverse the process
            .update('movies', {_id: movie._id}, {
                $inc: {numberInStock: -1}
            })
            .run();

        return res.status(201).send(rental);
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

module.exports = router;
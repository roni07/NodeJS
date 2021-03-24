const express = require('express');
const error = require('../middleware/error-middleware');
const genre = require('../routes/genre-api');
const customer = require('../routes/customer-api');
const movie = require('../routes/movie-api');
const rental = require('../routes/rental-api');
const user = require('../routes/user-api');
const auth = require('../routes/auth');
const author = require('../routes/author-api');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/genre', genre);
    app.use('/api/customer', customer);
    app.use('/api/movie', movie);
    app.use('/api/rental', rental);
    app.use('/api/user', user);
    app.use('/api/auth', auth);
    app.use('/api/author', author);

    app.use(error); // catch block message handling
}
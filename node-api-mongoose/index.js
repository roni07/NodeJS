const mongoose = require('mongoose');
const genre = require('./routes/genre-api');
const customer = require('./routes/customer-api');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log('Connected to vidly database.....'))
    .catch(err => console.error('Could not connect to database....'));

app.use(express.json());

app.use('/api/genre', genre);
app.use('/api/customer', customer);

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}....`));
const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost/vidly', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(() => console.log('Connected to vidly database.....'));
}
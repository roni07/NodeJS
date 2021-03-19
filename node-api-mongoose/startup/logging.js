require('express-async-errors'); // control try catch block with error on asyncMiddleware
const winston = require('winston'); // for logging message
require('winston-mongodb'); // log store in database
module.exports = function () {
    /*winston.add(new winston.transports.File({filename: 'logfile.log'})); // log storing
winston.add(new winston.transports.MongoDB({
    db: 'mongodb://localhost/vidly',
    level: 'info'
}));*/
}
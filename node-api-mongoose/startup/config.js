const config =require('config'); // for environment settings

module.exports = function () {
    if (!config.get('secretKey')) {
        throw new Error('FATAL ERROR: secretKey is not defined');
    }
}
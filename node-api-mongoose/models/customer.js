const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v.length === 11;
            },
            message: 'Phone number must be 11 digits'
        }
    }
}));

exports.Customer = Customer;

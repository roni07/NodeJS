const auth = require('../middleware/auth-middleware');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, userValidation} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/list', async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).send(users);
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    return res.send(user);
});

router.post('/create', async (req, res) => {
    try {
        const {error} = userValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({email: req.body.email});
        if (user) return res.status(400).send(`User already registered with email ${req.body.email}`);

        user = new User(_.pick(req.body, ['name', 'email', 'password'])); // making object attributes using pick from lodash
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        /*user = new User({ // manually make object attributes
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });*/

        await user.save();
        const token = user.generateAuthToken();
        return res.status(201)
            .header('x-auth-token', token) // header used for after crating user it will login automatically
            .send(_.pick(user, ['_id', 'name', 'email'])); // exclude object values using pick from lodash

        /*return res.status(201).send({ // manually exclude object values
            name: user.name,
            email: user.email
        });*/
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

module.exports = router;

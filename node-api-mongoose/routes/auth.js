const Joi = require('joi');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
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

router.post('/login', async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({email: req.body.email});
        if (!user) return res.status(400).send(`${req.body.email} is invalid email`);

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).send(`${req.body.password} is invalid password`)

        // const token = jwt.sign({_id: user._id}, config.get('secretKey'));
        const token = user.generateAuthToken();
        return res.send(token);
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

const validate = req => {
    const schema = Joi.object({
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    });

    return schema.validate(req);
}

module.exports = router;

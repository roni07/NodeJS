const {Customer: CustomerApi} = require('../models/customer');
const express = require('express');
const router = express.Router();

router.get('/list', async (req, res) => {
    try {
        const customers = await CustomerApi.find().sort('name');
        return res.status(200).send(customers);
    } catch (err) {
        console.log(err.message);
        return res.send(err.message);
    }
});

router.post('/create', async (req, res) => {
    try {
        let customer = new CustomerApi({
            isGold: req.body.isGold,
            name: req.body.name,
            phone: req.body.phone
        });
        customer = await customer.save();
        res.status(201).send(customer);
    } catch (err) {
        console.log(err.message);
        return res.send(err.message);
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const customer = await CustomerApi.findByIdAndUpdate(req.params.id,
            {
                isGold: req.body.isGold,
                name: req.body.name,
                phone: req.body.phone
            },
            {new: true});

        if (!customer) return res.status(404).send(`The customer with the given ID ${req.params.id} not found`);

        return res.status(200).send(customer);
    } catch (err) {
        console.log(err.message);
        return res.send(err.message);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const customer = await CustomerApi.findByIdAndRemove(req.params.id);
        if (!customer) return res.status(404).send(`The customer with the given ID ${req.params.id} not found`);

        return res.status(200).send(`Successfully deleted customer ${customer.id}`);
    } catch (err) {
        console.log(err.message);
        return res.send(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const customer = await CustomerApi.findById(req.params.id);
        if (!customer) return res.status(404).send(`The customer with the given ID ${req.params.id} not found`);

        return res.status(200).send(customer);
    } catch (err) {
        console.log(err.message);
        return res.send(err.message);
    }
});

module.exports = router;

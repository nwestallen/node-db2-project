// DO YOUR MAGIC
const express = require('express');
const Car = require('./cars-model');
const router = express.Router();


router.get('/', (req, res, next) => {
    Car.getAll()
    .then(cars => {
        res.json(cars);
    })
    .catch(err => next(err));
});

module.exports = router;

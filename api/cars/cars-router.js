// DO YOUR MAGIC
const express = require('express');
const { checkCarId } = require('./cars-middleware');
const Car = require('./cars-model');
const router = express.Router();


router.get('/', (req, res, next) => {
    Car.getAll()
    .then(cars => {
        res.json(cars);
    })
    .catch(err => next(err));
});

router.get('/:id', checkCarId, (req, res, next) => {
    Car.getById(req.params.id)
    .then(car => {
        res.json(car);
    })
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
    Car.create(req.body)
    .then(newCar => {
        res.status(201).json(newCar);
    })
    .catch(err => next(err));
});

module.exports = router;

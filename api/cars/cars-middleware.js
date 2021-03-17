const Car = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id
  Car.getById(id)
  .then(car => {
    if (!car) {
      res.status(404).json({ message: `car with id ${id} is not found`})
    } else {
      req.car = car
      next()
    }
  })
  .catch(err => next(err));
};

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const {vin, make, model, mileage} = req.body;
  if (!vin) {
    res.status(400).json({ message: 'vin is missing'})
  } else if (!make) {
    res.status(400).json({ message: 'make is missing'})
  } else if (!model) {
    res.status(400).json({ message: 'model is missing'})
  } else if (!mileage) {
    res.status(400).json({ message: 'mileage is missing'})
  } else {
    next()
  }
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const isValidVin = vinValidator.validate(req.body.vin);
  if (!isValidVin) {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid`})
  } else {
    next()
  }
};

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  Car.getByVin(req.body.vin)
  .then(car => {
    if (car) {
      res.status(400).json({ message: `vin ${req.body.vin} already exists`})
    } else {
      req.car = car
      next()
    }
  })
  .catch(err => next(err));
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
};

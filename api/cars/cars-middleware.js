const Car = require('./cars-model');
const db = require('../../data/db-config');

async function checkCarId(req, res, next) {
  try {
    const car = await Car.getById(req.params.id);
    if (!car) {
      next({ status: 404, message: `car with id ${req.params.id} is not found` })
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    next(err);
  }
}

function checkCarPayload(req, res, next) {
  const { vin, make, model, mileage } = req.body;
  if (vin === undefined ||
    make === undefined ||
    model === undefined || 
    mileage === undefined
  ) {
    next({ status: 400, message: `${req.body.field} is missing` });
  } else {
    next();
  }
}

function checkVinNumberValid(req, res, next) {
  // DO YOUR MAGIC
}

async function checkVinNumberUnique(req, res, next) {
  try {
    const existingVin = await db('cars').where('vin', req.body.vin).first();
    if (existingVin) {
      next({ status: 400, message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
};
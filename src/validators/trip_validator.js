// validators/tripValidator.js
const { check } = require('express-validator');

const validateCalculateTripFare = [
    check('tripLength').exists().withMessage('Trip length is required'),
    check('tripLength').isNumeric().withMessage('Trip length must be a numeric value'),
];

const validateCreateTrip = [
    check('customer_id').exists().withMessage('customer_id is required'),
    check('pickupLocation').exists().withMessage('Pickup location is required'),
    check('dropoffLocation').exists().withMessage('dropoffLocation location is required'),
    check('fare').exists().withMessage('Fare is required'),
    check('tripLengh').exists().withMessage('tripLengh is required'),
];


module.exports = { validateCalculateTripFare, validateCreateTrip };

// customerValidator.js

const { body } = require('express-validator');

const createCustomerValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('phoneNumber').notEmpty().withMessage('Phone number is required').isMobilePhone().withMessage('Invalid phone number'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),
    body('homeAddress').optional().isString().withMessage('Home address must be a string'),
];

module.exports = {
    createCustomerValidator,
};

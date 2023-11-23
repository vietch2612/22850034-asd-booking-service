// customerRouter.js

const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer_controller');

router.get('/customers', customerController.getAllCustomers);
router.get('/customers/:id', customerController.getCustomerById);
router.get('/customers/search', customerController.searchCustomerPhone);
router.post('/customers', customerController.createCustomer);

module.exports = router;

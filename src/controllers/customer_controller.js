// customerController.js

const customerService = require('../services/customerService');

async function getAllCustomers(req, res) {
    try {
        const customers = await customerService.getAllCustomers();
        res.status(200).json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getCustomerById(req, res) {
    try {
        const customerId = req.params.id;
        const customer = await customerService.getCustomerById(customerId);

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        res.status(200).json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function searchCustomerPhone(req, res) {
    try {
        const phoneNumber = req.query.phone;
        const customers = await customerService.searchCustomerPhone(phoneNumber);
        res.status(200).json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function createCustomer(req, res) {
    try {
        createCustomerValidator(req, res);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const customerData = req.body;
        const newCustomer = await customerService.createCustomer(customerData);
        res.status(201).json(newCustomer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    getAllCustomers,
    getCustomerById,
    searchCustomerPhone,
    createCustomer,
};

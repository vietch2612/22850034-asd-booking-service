const { Customer } = require('../models');
const { CustomerType } = require('../models');
const logger = require('../utils/logger');

async function getAllCustomers() {
    return await Customer.findAll();
}

async function getCustomerById(customerId) {
    return await Customer.findByPk(customerId);
}

async function searchCustomerPhone(phoneNumber) {
    logger.info("searching customer by phone number: ", phoneNumber);
    return await Customer.findAll({
        where: {
            phoneNumber: phoneNumber,
        },
        include: [
            {
                model: CustomerType,
                attributes: ['id', 'name'],
            },
        ],
    });
}

async function createCustomer(customerData) {
    return await Customer.create(customerData);
}

async function getTotalCustomers() {
    return await Customer.count();
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    searchCustomerPhone,
    createCustomer,
    getTotalCustomers
};

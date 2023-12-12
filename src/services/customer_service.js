const { Customer } = require('../models');
const { CustomerType } = require('../models');


async function getAllCustomers() {
    return await Customer.findAll();
}

async function getCustomerById(customerId) {
    return await Customer.findByPk(customerId);
}

async function searchCustomerPhone(phoneNumber) {
    console.log("searching customer by phone number: ", phoneNumber);
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

module.exports = {
    getAllCustomers,
    getCustomerById,
    searchCustomerPhone,
    createCustomer,
};

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const smsEnabled = process.env.SMS_ENABLED;
const client = require('twilio')(accountSid, authToken);
const customerService = require('./customer_service');
const logger = require('../utils/logger');

function formatPhoneNumber(phoneNumber) {
    if (phoneNumber.startsWith('0')) {
        return '+84' + phoneNumber.slice(1);
    } else {
        return phoneNumber;
    }
}

async function sendSmsNotification(phones, content) {
    if (smsEnabled == 'true') {
        client.messages
            .create({
                body: content,
                from: '+18635887143',
                to: formatPhoneNumber(phones)
            })
            .then(message => logger.warn(`SMS is sent. ID: ${message.sid}`));
    }
}

class SmsService {
    static notifyTripCreatedSMS = async (trip) => {
        logger.info("Sending SMS to customer: ", trip.customerId);
        const customer = await customerService.getCustomerById(trip.customerId);
        if (customer) {
            const message = `Ban da dat thanh cong chuyen di ${trip.id}. Diem don: ${trip.pickupLocation}. Tong tien: ${trip.fare}`;
            sendSmsNotification(customer.phoneNumber
                , message);
        }
    }

    static notifyFoundDriverSMS = async (trip, driver) => {
        logger.info("Sending SMS to customer: ", trip.customerId);
        const customer = await customerService.getCustomerById(trip.customerId);
        if (customer) {
            const message = `Tai xe ${driver.name} da nhan chuyen di ${trip.id}. So dien thoai: ${driver.phoneNumber}`;
            sendSmsNotification(customer.phoneNumber
                , message);
        }
    }
}

module.exports = SmsService;

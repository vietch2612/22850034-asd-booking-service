const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

function formatPhoneNumber(phoneNumber) {
    // Check if the phone number starts with "0"
    if (phoneNumber.startsWith('0')) {
        // Replace the leading "0" with "+84"
        return '+84' + phoneNumber.slice(1);
    } else {
        // If the phone number doesn't start with "0", return it unchanged
        return phoneNumber;
    }
}

class SmsService {
    static sendSmsNotification = async (phones, content) => {
        const client = require('twilio')(accountSid, authToken);

        client.messages
            .create({
                body: content,
                from: '+18635887143',
                to: formatPhoneNumber(phones)
            })
            .then(message => console.log(message.sid));
    }
}

module.exports = SmsService;

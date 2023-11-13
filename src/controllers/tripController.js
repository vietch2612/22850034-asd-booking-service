// controllers/tripController.js
const { validationResult } = require('express-validator');
const { calculateFare } = require('../services/fareService');
const { createTrip } = require('../services/tripService');

const createTripController = async (req, res) => {
    try {
        const {
            customerId,
            pickupLocation,
            pickupLat,
            pickupLong,
            dropoffLocation,
            dropoffLat,
            dropoffLong,
            fare,
            tripLength,
            notes
        } = req.body;

        // Call a service to create a new trip
        const { tripId, status, driverDetails } = await createTrip({
            customerId,
            pickupLocation,
            pickupLat,
            pickupLong,
            dropoffLocation,
            dropoffLat,
            dropoffLong,
            fare,
            tripLength,
            notes
        });

        console.log("tripID: ", tripId);

        // Emit a socket event to notify drivers about the new trip
        req.app.io.emit('newTripAvailable', { tripId, pickupLocation, dropoffLocation });

        // You might want to send additional information to the customer app
        // For example, driverDetails could include information about the available drivers

        res.status(200).json({ tripId, status, driverDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const calculateFareController = async (req, res) => {
    try {
        // Validate the request body using express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { tripLength } = req.body;

        // Call a service to calculate the fare based on the length of the trip
        const fare = await calculateFare(tripLength);

        res.status(200).json({ fare });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { createTripController, calculateFareController };


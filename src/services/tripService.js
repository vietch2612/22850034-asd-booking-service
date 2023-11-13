// services/tripService.js
const { Trip } = require('../models');

const createTrip = async ({
    customerId,
    pickupLocation,
    pickupLat,
    pickupLong,
    dropoffLocation,
    dropoffLat,
    dropoffLong,
    fare,
    tripLength,
    notes,
}) => {
    try {
        // Create a new trip in the database with the provided details
        const trip = await Trip.create({
            customerId,
            pickupLocation,
            pickupLat,
            pickupLong,
            dropoffLocation,
            dropoffLat,
            dropoffLong,
            fare,
            tripLength,
            notes,
            status: 'finding_driver',
        });

        // You might want to perform additional logic here, such as notifying available drivers

        // For simplicity, let's assume there is a fake driver
        const fakeDriverDetails = {
            id: '123',
            name: 'John Doe',
            vehicleNumber: 'XYZ123',
            currentLocation: { latitude: 12.9751, longitude: 77.6047 },
        };

        console.log("Trip ID: ", trip.id);

        return {
            tripId: trip.id, // Make sure to return the trip ID
            status: trip.status,
            driverDetails: fakeDriverDetails,
        };
    } catch (error) {
        throw error;
    }
};

module.exports = { createTrip };

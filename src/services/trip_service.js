const models = require('../models'); // Adjust the path based on your project structure

const createTrip = async (tripData) => {
    try {
        const trip = await models.Trip.create(tripData);
        return trip;
    } catch (error) {
        throw new Error('Error creating trip: ' + error.message);
    }
};

const getTripById = async (tripId) => {
    try {
        const trip = await models.Trip.findByPk(tripId);
        return trip;
    } catch (error) {
        throw new Error('Error getting trip by ID: ' + error.message);
    }
};

const updateTrip = async (tripId, updatedTripData) => {
    try {
        const trip = await models.Trip.findByPk(tripId);
        if (!trip) {
            throw new Error('Trip not found');
        }

        await trip.update(updatedTripData);
        return trip;
    } catch (error) {
        throw new Error('Error updating trip: ' + error.message);
    }
};

module.exports = {
    createTrip,
    getTripById,
    updateTrip,
};
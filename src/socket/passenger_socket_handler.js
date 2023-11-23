const tripService = require('../services/trip_service');
const driverService = require('../services/driver_service');
const TripStatus = require('../enums/trip_status');
const TripEvent = require('../enums/trip_event');

module.exports = (socket, io) => {

    /** Passenger submitted a new trip
     * 1. Create a new trip
     * 2. Find a nearest driver
     * 3. Emit a message to the driver's room based on driverId;
     */
    socket.on(TripEvent.TRIP_PASSENGER_SUBMIT, async (tripData) => {
        try {
            const newTrip = await tripService.createTrip(tripData);

            socket.join(newTrip.id);
            socket.emit(TripEvent.TRIP_PASSENGER_SUBMIT, newTrip.toJSON());

            const selectedDriver = driverService.findNearestDriver(newTrip);
            console.log(selectedDriver.toJSON());

            console.log(`[Socket]: Received a new trip ${newTrip.id}`);
        } catch (error) {
            console.error('Error creating trip:', error.message);
        }
    });
};

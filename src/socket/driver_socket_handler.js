const tripService = require('../services/trip_service');
const driverService = require('../services/driver_service');
const TripStatus = require('../enums/trip_status');
const TripEvent = require('../enums/trip_event');
const DriverStatus = require('../enums/driver_status');

module.exports = (socket, io) => {

    socket.on(TripEvent.DRIVER_ACTIVE, async (driverData) => {
        let driver = await driverService.getDriverById(driverData.id);

        if (driver.status != DriverStatus.ACTIVE) {
            driver.status = DriverStatus.ACTIVE;
        }

        await driverService.updateDriver({
            id: driverData.id,
        }, driverData.driverLocation);
        console.log('Driver active successfully!')
    });

    socket.on('allocated', async (tripData) => {
        try {
            tripData.status = TripStatus.ALLOCATED;
            let trip = await tripService.updateTrip(tripData);
            trip = await tripService.getTripById(trip.id);

            socket.join(trip.id);
            io.to(trip.id).emit('allocated', trip.toJSON());
        } catch (error) {
            console.error('Error updating trip:', error.message);
        }
    });

    socket.on('location_update', (data) => {
        console.log(`[${data.tripId}] Updating location`);
        socket.emit('location_update', data);
    });

};

const tripService = require('../services/trip_service');
const driverService = require('../services/driver_service');
const TripStatus = require('../enums/trip_status');
const TripEvent = require('../enums/trip_event');
const DriverStatus = require('../enums/driver_status');

module.exports = (socket, io) => {

    socket.on(TripEvent.DRIVER_ACTIVE, async (driverData) => {
        console.log("driver_data: ", driverData);
        let driver = await driverService.getDriverById(driverData.id);

        if (driver && driver.status != DriverStatus.ACTIVE) {
            driver.status = DriverStatus.ACTIVE;
        }

        await driverService.updateDriver({
            id: driverData.id,
        }, driverData.driverLocation);
        const roomId = `DRIVER_${driverData.id}`;
        await socket.join(roomId);

        console.log('Driver active successfully! Joined room: ', roomId);
    });

    socket.on(TripEvent.DRIVER_CANCEL, async (driverData) => {
        let driver = await driverService.getDriverById(driverData.id);

        if (driver.status != DriverStatus.INACTIVE) {
            driver.status = DriverStatus.INACTIVE;
        }

        await driverService.updateDriver({
            id: driverData.id,
        }, driverData.driverLocation);

        socket.disconnect();

        console.log('Driver inactive successfully!')
    });

    socket.on(TripEvent.TRIP_DRIVER_ACCEPT, async (tripData) => {
        console.log("TRIP_DRIVER_ACCEPT: ", tripData);
        try {
            await driverService.updateDriver({
                id: tripData.driver.id,
                // status: DriverStatus.ON_TRIP
            }, tripData.driverLocation);

            let trip = await tripService.updateTrip({
                id: tripData.id,
                status: TripStatus.ALLOCATED,
                driverId: tripData.driver.id
            });

            trip = await tripService.getTripById(trip.id);
            await io.to(trip.id).emit(TripEvent.TRIP_DRIVER_ALLOCATE, trip.toJSON());
            console.log('TRIP_DRIVER_ALLOCATE', trip.toJSON());
        } catch (error) {
            console.error('Error updating trip:', error.message);
        }
    });

    socket.on(TripEvent.TRIP_DRIVER_ARRIVED, async (tripData) => {
        try {
            await driverService.updateDriver({
                id: tripData.driver.id,
            }, tripData.driver.driverLocation);

            let trip = await tripService.updateTrip({
                id: tripData.id,
                status: TripStatus.DRIVING
            });

            trip = await tripService.getTripById(trip.id);
            io.to(tripData.id).emit(TripEvent.TRIP_DRIVER_ARRIVED, trip.toJSON());
            console.log('Driver has arrived!')
        } catch (error) {
            console.error('ARRIVED: Error updating trip:', error.message);
        }
    });

    socket.on(TripEvent.TRIP_DRIVER_DRIVING, async (tripData) => {
        try {
            await driverService.updateDriver({
                id: tripData.driver.id,
                // status: DriverStatus.ON_TRIP
            }, tripData.driver.driverLocation);

            let trip = await tripService.updateTrip({
                id: tripData.id,
                status: TripStatus.ALLOCATED,
                driverId: tripData.driver.id
            });

            trip = await tripService.getTripById(trip.id);
            await io.to(trip.id).emit(TripEvent.TRIP_DRIVER_DRIVING, trip.toJSON());
        } catch (error) {
            console.error('ARRIVED: Error updating trip:', error.message);
        }
    });

    socket.on(TripEvent.TRIP_DRIVER_COMPLETED, async (tripData) => {
        try {
            await driverService.updateDriver({
                id: tripData.driver.id,
            }, tripData.driver.driverLocation);

            let trip = await tripService.updateTrip({
                id: tripData.id,
                status: TripStatus.COMPLETED
            });

            trip = await tripService.getTripById(trip.id);
            io.to(tripData.id).emit(TripEvent.TRIP_DRIVER_COMPLETED, trip.toJSON());
            console.log('Driver has completed!')
        } catch (error) {
            console.error('COMPLETED: Error updating trip:', error.message);
        }
    });

};
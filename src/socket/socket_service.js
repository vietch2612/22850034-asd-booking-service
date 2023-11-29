const { sequelize } = require('../models');
const TripEvent = require('../enums/trip_event');
const driverService = require('../services/driver_service');

class SocketService {
    static async findNewDriver(socket, io, trip) {
        const selectedDriver = await driverService.findNearestDriver(trip);

        if (selectedDriver != null) {
            const roomId = `DRIVER_${selectedDriver.driverId}`;
            io.to(roomId).emit(TripEvent.TRIP_DRIVER_ALLOCATE, trip.toJSON());
            console.log('Found a driver: ', roomId);
        }
    }

    static async notifyAllocated(socket, trip, io) {
        socket.emit(TripEvent.TRIP_DRIVER_ALLOCATE, trip.toJSON());
    }
}

module.exports = SocketService;
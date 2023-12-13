const { sequelize } = require('../models');
const TripEvent = require('../enums/trip_event');
const driverService = require('../services/driver_service');
const tripService = require('../services/trip_service');
const customerService = require('../services/customer_service');
const SmsService = require('../services/sms_service');

class SocketService {
    static async findNewDriver(_, io, trip) {
        const customer = await customerService.getCustomerById(trip.customerId);
        if (customer) {
            const message = `Ban da dat thanh cong chuyen di ${trip.id}. Diem don: ${trip.pickupLocation}. Tong tien: ${trip.fare}`;
            SmsService.sendSmsNotification(customer.phoneNumber
                , message);
        }

        const selectedDriver = await driverService.findNearestDriver(trip);
        if (selectedDriver != null) {
            const newTrip = await tripService.getTripById(trip.id);
            const roomId = `DRIVER_${selectedDriver.driverId}`;
            io.to(roomId).emit(TripEvent.TRIP_DRIVER_ALLOCATE, newTrip.toJSON());

            console.log(`Found a driver for tripId: ${trip.id}, driverId: ${selectedDriver.driverId}`);
        }

        return selectedDriver
    }

    static async notifyAllocated(socket, trip, io) {
        socket.emit(TripEvent.TRIP_DRIVER_ALLOCATE, trip.toJSON());
    }
}

module.exports = SocketService;

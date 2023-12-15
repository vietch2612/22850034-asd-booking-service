const FareService = require('../services/fare_service');
const SocketService = require('../socket/socket_service');
const SmsService = require('../services/sms_service');

const tripService = require('../services/trip_service');
const driverService = require('../services/driver_service');
const customerService = require('../services/customer_service');
const schedule = require('node-schedule');
const TripStatus = require('../enums/trip_status');


async function createTrip(req, res) {
    try {
        const tripData = req.body;
        const newTrip = await tripService.createTrip(tripData);
        console.log("Received a new trip from Admin: ", newTrip.toJSON());

        const io = req.app.io;

        const scheduleTime = new Date(tripData.scheduleTime);
        if (scheduleTime >= new Date() && tripData.serviceTypeId == 2) {
            await tripService.updateTrip({ id: newTrip.id, status: TripStatus.SCHEDULED });
            const scheduleId = `TRIP_${newTrip.id}`;
            schedule.scheduleJob(scheduleId, scheduleTime, async () => {
                await SocketService.findNewDriver(null, io, newTrip);
            });
            console.log("Scheduled a new trip: ", scheduleId, " at ", scheduleTime);
        } else {
            await SocketService.findNewDriver(null, io, newTrip);
        }

        res.status(201).json(newTrip);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getTripById(req, res) {
    try {
        const tripId = req.params.id;
        const trip = await tripService.getTripById(tripId);

        if (!trip) {
            res.status(404).json({ error: 'Trip not found' });
        } else {
            res.status(200).json(trip);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getAllTrips(req, res) {
    try {
        const trips = await tripService.getAllTrips();
        res.status(200).json(trips);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function updateTrip(req, res) {
    try {
        const tripId = req.params.id;
        const updatedTripData = req.body;

        const updatedTrip = await tripService.updateTrip(tripId, updatedTripData);
        res.status(200).json(updatedTrip);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function calculateFare(req, res) {
    try {
        const tripData = req.body;
        const fare = await FareService.calculateFare(tripData.length / 1000, tripData.
            serviceType);
        console.log(tripData.length);
        res.status(200).json({ fare: fare });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getStatistics(req, res) {
    try {
        const totalRevenue = await tripService.getTotalRevenue();
        const totalTrips = await tripService.getTotalTrips();
        const totalDrivers = await driverService.getTotalDrivers();
        const totalCustomers = await customerService.getTotalCustomers();
        const changeLastMonth = await tripService.getPercentageChangeLastMonth();
        const totalTripsByStatus = await tripService.getTotalTripsByStatus();

        res.status(200).json({
            totalRevenue,
            totalTrips,
            totalDrivers,
            totalCustomers,
            changeLastMonth,
            totalTripsByStatus
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateTripRating(req, res) {
    try {
        tripService.updateTrip({ id: req.params.id, rating: req.body.rating });
        res.status(200).json({ message: 'Rating updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    createTrip,
    getTripById,
    updateTrip,
    getAllTrips,
    calculateFare,
    getStatistics,
    updateTripRating
};
const calculateDistance = require('../utils/mapUtil');
const { DriverLocation } = require('../models');

async function findNearestDriver(trip) {
    const pickupLocationLat = trip.pickupLocationLat;
    const pickupLocationLong = trip.pickupLocationLong;
    const maxDistanceInKm = 5; // Maximum distance in kilometers

    const drivers = await DriverLocation.findAll({
        attributes: ['driverId', 'lat', 'long'],
        include: [{
            model: Driver,
            where: { status: 'Active' },
            attributes: ['status'],
        }, {
            model: DeclinedTrip,
            where: { tripId: trip.id },
            required: false,
        }],
        where: {
            '$DeclinedTrips.driverId$': null,
        },
    });

    let nearestDriver;
    let minDistance = maxDistanceInKm;

    for (const driver of drivers) {
        const distance = calculateDistance(pickupLocationLat, pickupLocationLong, driver.lat, driver.long);
        if (distance < minDistance) {
            minDistance = distance;
            nearestDriver = driver;
        }
    }

    if (minDistance <= maxDistanceInKm) {
        console.log('Nearest Driver within 5 km:', nearestDriver);
    } else {
        console.log('No drivers found within 5 km.');
    }

    return nearestDriver;
}

module.exports = { findNearestDriver };

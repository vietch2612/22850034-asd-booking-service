const models = require('../models'); // Adjust the path based on your project structure
const { Sequelize, Op } = require('sequelize');

const createTrip = async (tripData) => {
    try {
        const trip = await models.Trip.create(tripData, {
            include: [
                {
                    model: models.Driver,
                    attributes: ['id', 'name', 'phoneNumber', 'licensePlateNumber', 'rating', 'avatarUrl', 'status'],
                    include: [
                        {
                            model: models.DriverLocation,
                            attributes: ['lat', 'long', 'updatedAt'],
                            order: [['updatedAt', 'DESC']],
                            limit: 1,
                        },
                        {
                            model: models.Car,
                            attributes: ['name']
                        }
                    ]
                },
                {
                    model: models.Customer,
                    attributes: ['id', 'name', 'phoneNumber', 'email', 'homeAddress', 'homeAddressLat', 'homeAddressLong', 'walletBalance', 'avatarUrl'],
                },
            ],
        });
        return trip;
    } catch (error) {
        throw new Error('Error creating trip: ' + error.message);
    }
};

const getTripById = async (tripId) => {
    try {
        const trip = await models.Trip.findByPk(tripId,
            {
                include: [
                    {
                        model: models.Driver,
                        attributes: ['id', 'name', 'phoneNumber', 'licensePlateNumber', 'rating', 'avatarUrl', 'status'],
                        include: [
                            {
                                model: models.DriverLocation,
                                attributes: ['lat', 'long', 'updatedAt'],
                                order: [['updatedAt', 'DESC']],
                                limit: 1,
                            },
                            {
                                model: models.Car,
                                attributes: ['name']
                            }
                        ]
                    },
                    {
                        model: models.Customer,
                        attributes: ['id', 'name', 'phoneNumber', 'email', 'homeAddress', 'homeAddressLat', 'homeAddressLong', 'walletBalance', 'avatarUrl'],
                    },
                ],
            });
        return trip;
    } catch (error) {
        throw new Error('Error getting trip by ID: ' + error.message);
    }
};

const getAllTrips = async () => {
    try {
        const trips = await models.Trip.findAll({
            order: [['id', 'DESC']],
            include: [
                {
                    model: models.Driver,
                    attributes: ['id', 'name', 'phoneNumber', 'licensePlateNumber', 'rating', 'avatarUrl', 'status'],
                    include: [
                        {
                            model: models.DriverLocation,
                            attributes: ['lat', 'long', 'updatedAt'],
                            order: [['updatedAt', 'DESC']],
                            limit: 1,
                        },
                        {
                            model: models.Car,
                            attributes: ['name']
                        }
                    ]
                },
                {
                    model: models.Customer,
                    attributes: ['id', 'name', 'phoneNumber', 'email', 'homeAddress', 'homeAddressLat', 'homeAddressLong', 'walletBalance', 'avatarUrl'],
                },
                {
                    model: models.ServiceType,
                    attributes: ['name', 'numberOfSeat']
                }
            ],
        });
        return trips;
    } catch (error) {
        throw new Error('Error getting all trips: ' + error.message);
    }
};

const updateTrip = async (updatedTripData) => {
    try {
        const trip = await models.Trip.findByPk(updatedTripData.id);
        if (!trip) {
            throw new Error('Trip not found');
        }

        await trip.update(updatedTripData);
        return trip;
    } catch (error) {
        throw new Error('Error updating trip: ' + error.message);
    }
};

const newDeclinedTrip = async (declinedTripData) => {
    try {
        const declinedTrip = await models.DeclinedTrip.create(declinedTripData);
        return declinedTrip;
    } catch (error) {
        throw new Error('Error creating declined trip: ' + error.message);
    }
};

const getTotalRevenue = async () => {
    try {
        const totalRevenue = await models.Trip.sum('fare', {
            where: {
                status: 4,
            },
        });

        return totalRevenue || 0;
    } catch (error) {
        throw error;
    }
};

const getTotalTrips = async () => {
    try {
        const totalTrips = await models.Trip.count();

        return totalTrips || 0;
    } catch (error) {
        throw error;
    }
}

const getPercentageChangeLastMonth = async () => {
    try {
        const currentDate = new Date();
        const lastMonthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const lastMonthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);


        console.log("lastMonthStartDate: ", lastMonthStartDate);
        console.log("lastMonthEndDate: ", lastMonthEndDate);

        const totalTripsLastMonth = await models.Trip.count({
            where: {
                createdAt: {
                    [Op.between]: [lastMonthStartDate, lastMonthEndDate],
                },
            },
        });

        const totalTripsCurrentMonth = await models.Trip.count({
            where: {
                createdAt: {
                    [Op.between]: [lastMonthEndDate, currentDate],
                },
            },
        });

        console.log("totalTripsCurrentMonth: ", totalTripsCurrentMonth);
        console.log("totalTripsLastMonth: ", totalTripsLastMonth);

        const percentageChange = totalTripsLastMonth === 0
            ? 100
            : ((totalTripsCurrentMonth - totalTripsLastMonth) / totalTripsLastMonth) * 100;

        return percentageChange;
    } catch (error) {
        throw error;
    }
};

const getTotalTripsByStatus = async () => {
    try {
        const statusCounts = await models.Trip.findAll({
            attributes: ['status', [Sequelize.fn('COUNT', Sequelize.col('id')), 'total']],
            group: ['status'],
            raw: true,
        });

        return statusCounts;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    createTrip,
    getTripById,
    updateTrip,
    getAllTrips,
    newDeclinedTrip,
    getTotalRevenue,
    getTotalTrips,
    getPercentageChangeLastMonth,
    getTotalTripsByStatus
};
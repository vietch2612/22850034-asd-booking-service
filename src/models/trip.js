'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Trip extends Model {
    }
    Trip.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        driverId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        serviceTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        pickupLocation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pickupLocationLat: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        pickupLocationLong: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        dropoffLocationLat: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        dropoffLocationLong: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        dropoffLocation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        fare: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        distance: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        sequelize,
        modelName: 'Trip',
        timestamps: true
    });
    return Trip;
};

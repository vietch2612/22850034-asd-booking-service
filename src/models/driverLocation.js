'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DriverLocation extends Model {
        static associate(models) {
            DriverLocation.belongsTo(models.Driver, { foreignKey: 'driverId' })
        }
    }
    DriverLocation.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        driverId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        lat: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        long: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        lastUpdatedAt: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'DriverLocation',
        timestamps: true
    });
    return DriverLocation;
};

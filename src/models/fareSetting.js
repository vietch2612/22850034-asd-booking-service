'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FareSetting extends Model {
    }
    FareSetting.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        startKm: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        endKm: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pricePerKm: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'FareSetting',
        timestamps: true
    });
    return FareSetting;
};

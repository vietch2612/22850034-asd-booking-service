'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        static associate(models) {
            Customer.belongsTo(model.CustomerType, { foreignKey: 'customerTypeId' });
            Customer.hasMany(model.Trip, { foreignKey: 'customerId' });
        }
    }
    Customer.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        customerTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        homeAddress: {
            type: DataTypes.STRING,
            allowNull: true
        },
        homeAddressLat: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        homeAddressLong: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        walletBalance: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        avatarUrl: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Customer',
        timestamps: true
    });
    return Customer;
};

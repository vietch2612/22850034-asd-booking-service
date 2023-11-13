'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
    }
    Role.init({
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        roles: {
            type: DataTypes.ARRAY(DataTypes.ENUM('customer', 'driver', 'admin')),
            defaultValue: ['customer'],
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        middleName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        homeAddress: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        walletBalance: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0.00,
        },
    }, {
        sequelize,
        modelName: 'User',
        timestamps: true
    });
    return Role;
};

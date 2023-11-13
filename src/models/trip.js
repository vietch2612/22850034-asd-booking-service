'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Role.hasMany(models.User, { foreignKey: 'roleId' })
        }
    }
    Role.init({
        tripId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        customerId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        driverId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'new',
        },
        pickupLocation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pickupLat: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        pickupLong: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        dropoffLat: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        dropoffLong: {
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
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        paymentStatus: {
            type: DataTypes.STRING,
            defaultValue: 'pending',
        },
        tripLength: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }, {
        sequelize,
        modelName: 'Trip',
        timestamps: true
    });
    return Role;
};

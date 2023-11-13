'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trip', {
      tripId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      customerId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      driverId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'new',
      },
      pickupLocation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pickupLat: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      pickupLong: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      dropoffLat: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      dropoffLong: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      dropoffLocation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      startTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      endTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      fare: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      paymentStatus: {
        type: Sequelize.STRING,
        defaultValue: 'pending',
      },
      tripLength: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Trip');
  }
};
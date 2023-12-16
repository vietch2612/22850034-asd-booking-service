const passengerSocketHandler = require('./passenger_socket_handler');
const driverSocketHandler = require('./driver_socket_handler');
const logger = require('../utils/logger');

module.exports = (io) => {
    io.on('connection', (socket) => {
        logger.info('A user is connected to the socket');

        passengerSocketHandler(socket, io);
        driverSocketHandler(socket, io);

        socket.on('disconnect', () => {
            logger.info('A user is disconnected to the socket');
        });
    });
};

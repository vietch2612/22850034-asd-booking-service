// socketLogic.js
module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Passenger start a trip
        socket.on('submitted', (data) => {
            const trip = JSON.parse(data);
            // Join the room
            socket.join(trip.tripId);
            console.log(trip.tripId);
            console.log(`New trip: ${trip.tripId}`);

            // Finding driver
            io.to(data.tripId).emit('fining_driver', 'submitted');
            io.to("looking").emit('available_trip', data);
            console.log(`Finding driver: ${data.tripId}`);
        });

        socket.on('accept_trip', (data) => {
            socket.join(data.tripId);
            io.to(data.tripId).emit('allocated', data);
            console.log(`Driver accepted: ${data.tripId}`);
        });

        socket.on('location_update', (data) => {
            console.log(`[${data.tripId}] Updating location`);

            // Finding driver
            socket.emit('location_update', data);
        });

        socket.on('driving', (data) => {
            console.log(`Driver driving`);

            // Finding driver
            socket.emit('driving', data);
            console.log(`Driver driving`);
        });

        socket.on('driver_arrived', (data) => {
            const trip = JSON.parse(data)
            console.log(`Driver driver_arrived`);

            // Finding driver
            io.to(trip.tripId).emit('driver_arrived', trip);
            console.log(`Driver driver_arrived: ${trip.tripId}`);
        });

        socket.on('in_transit', (data) => {
            const trip = JSON.parse(data)
            console.log(`In transit ${trip.tripId}`);

            io.to(trip.tripId).emit('in_transit', trip);
            console.log(`in_transit: ${trip.tripId}`);
        });

        socket.on('completed', (data) => {
            const trip = JSON.parse(data)
            console.log(`Trip ${trip.tripId} is completed!`);

            io.to(trip.tripId).emit('completed', trip);
        });

        socket.on('looking', (data) => {
            console.log(data);

            // Join the specified room
            socket.join("looking");
        });

        // Handling disconnection
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
};

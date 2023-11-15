// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const tripRoutes = require('./routes/tripRouter');
const { sequelize } = require('./models');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log('Incoming Request Body:', req.body);
  next();
});

// Attach Socket.IO instance to the app
app.io = io;

// Use trip routes
app.use('/api/trip', tripRoutes);

io.on('connection', (socket) => {
  console.log('A user connected');

  // Passenger start a trip
  socket.on('new_trip', (data) => {
    console.log(data);
    const trip = JSON.parse(data)

    // Join the specified room
    socket.join(trip.tripId);
    console.log(`New trip: ${trip.tripId}`);

    // Finding driver
    io.to(trip.tripId).emit('finding_driver', 'finding_driver');
    console.log(`Finding driver: ${trip.tripId}`);
  });

  socket.on('accept_trip', (data) => {
    const trip = JSON.parse(data)
    console.log(`Driver ${trip.driverName} joined: ${trip.tripId}`);

    // Finding driver
    io.to(trip.tripId).emit('picking_up', trip);
    console.log(`Driver accepted: ${trip.tripId}`);
  });

  socket.on('location_update', (data) => {
    const trip = JSON.parse(data)
    console.log(`Driver ${trip.driverName} updated location`);

    // Finding driver
    io.to(trip.tripId).emit('location_update', trip);
    console.log(`Driver updated location: ${trip.tripId}`);
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

  // Handling disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


// Sync database and start the server
sequelize.sync().then(() => {
  console.log('PostgreSQL database connected');
  server.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
  });
});


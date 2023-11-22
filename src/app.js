// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const tripRoutes = require('./routes/tripRouter');
const { sequelize } = require('./models');
const socketHandler = require('./socket/socketHandler');

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
app.use('/api/trips', tripRoutes);

// Handle the Socket connection
socketHandler(io);

// Sync database and start the server
sequelize.sync().then(() => {
  console.log('PostgreSQL database connected');
  server.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
  });
});
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

// Sync database and start the server
sequelize.sync().then(() => {
  console.log('PostgreSQL database connected');
  server.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
  });
});

// Socket.IO logic for real-time updates
io.on('connection', (socket) => {
  console.log('A user connected');

  // You can implement more Socket.IO logic here
  // For example, handle disconnections, listen for specific events, etc.

  // Example: Emit a welcome message to the connected user
  socket.emit('message', 'Welcome to the server!');
});

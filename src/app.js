require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const tripRoutes = require('./routes/trip_route');
const customerRoutes = require('./routes/customer_route');
const statisticsRoutes = require('./routes/statistics_route');
const { sequelize } = require('./models');
const socketHandler = require('./socket/socket_handler');
const authenticateRequest = require('./middlewares/auth_middleware');
const morgan = require('morgan');
const logger = require('./utils/logger');

const app = express();

logger.stream = {
  write: function (message, encoding) {
    logger.info(message.trim());
  },
};

/* Log incoming requests */
app.use(morgan(':method :url :status :response-time ms - :res[content-length] - :req[headers]', { stream: logger.stream }));

const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(bodyParser.json());

/** Socket.io */
app.io = io;

app.use(authenticateRequest);

/** Route management */
app.use('/api/trips', tripRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/statistics', statisticsRoutes);

/** Handle socket connection */
socketHandler(io);

/** Start the server */
const port = process.env.PORT || 4000;
sequelize.sync().then(() => {
  logger.info('HCMUSCab BE PostgreSQL database connected');
  server.listen(port, () => {
    logger.info(`HCMUSCab BE is running on http://localhost:${port}`);
  });
});

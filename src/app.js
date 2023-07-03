'use strcit';
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const redisStore = require('connect-redis').default;

const { createClient } = require('redis');
const redisClient = createClient({
  url: process.env.REDIS_URL
});
redisClient.connect().catch(console.error);

const app = express();
const port = process.env.PORT || 3000;

// Get request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: new redisStore({ client: redisClient }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 20 * 60 * 1000, // 20 minutes
  },
}));

// // Middleware
// app.use((request, response, next) => {
//   const Cart = require('./controllers/cart');
//   request.session.cart = new Cart(request.session.cart ? request.session.cart : {});
//   response.locals.quantity = request.session.cart.quantity;

//   next();
// });

// Routes
app.use('/', require('./routes/indexRouter'));

app.get('/createTables', (request, response) => {
  let models = require('./models');
  models.sequelize.sync().then(() => {
    response.send("tables created!!")
  });
});

app.use((request, respose, next) => {
  respose.status(404).json({ message: 'File/Page not found!' });
});

app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

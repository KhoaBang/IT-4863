const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorHandler');

/*
Import routes here:
*/
const searchRoutes = require('./routes/search.routes');


dotenv.config();

const app = express();
app.set('trust proxy', true);

const FRONTEND_URL = process.env.FRONTEND_URL || false;

const corsURLs = [FRONTEND_URL].filter(
  (v) => v,
);

app.use(
  cors({
    origin: corsURLs.length > 0 ? corsURLs : '*',
    methods: ['POST', 'GET', 'PUT', 'DELETE','PATCH'],
    optionsSuccessStatus: 200,
    preflightContinue: true,
  }),
);

app.use(morgan('tiny'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => res.send('Hello from legal retrival team!'));
app.get('/api', (req, res) => res.send('Hello from legal retrival team API!'));
app.use('/api', searchRoutes);


// Error Handling Middleware
app.use(errorHandler);

// Catch-all 404 for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    status: 0,
    message: 'Not Found - The requested resource does not exist.',
  });
});

module.exports = app;
'use strict';

import express from 'express';
import session from 'express-session';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import http from 'http';
import compression from 'compression';
import dotenv from 'dotenv';
import { dbConnect, dbDisconnect } from "./model/DBHandler";

// Load env file
dotenv.config();

// Routers
import API from './routes/API';

// Server App
const app = express();
const serverHTTP = http.Server(app);
const port = process.env.PORT;
const env = process.env.NODE_ENV;

// Setup of session
app.use(session({
  secret: Math
    .random()
    .toString(36)
    .substring(2, 15),
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

app.use(cookieParser());

// Logger
app.use(logger('combined'))

// Middleware to enable CORS
app.use((req, res, next) => {
  // TODO: Disable when it is required.
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    return res.status(200).json({});
  }
  next();
});

// Compression
app.use(compression());

// API
app.use('/api/', API);

// Test Ping
app.get('/ping', (_, res) => {
  res
    .status(200)
    .json({
      pong: true
    });
});

serverHTTP.listen(port, () => {
  console.log(`Service listening on http://localhost:${port}`);
  dbConnect();
});
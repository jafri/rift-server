const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('winston');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');

const authentication = require('./authentication');

// Start app
const app = express(feathers());
app.use(express.errorHandler())

// Load app configuration
app.configure(configuration());

// Database
const mysql = require('mysql2');

let db = mysql.createPool({
    host     : "localhost",
    port     : 3306,
    user     : "cpsc471",
    password : "q4x79YN6bit0sE6oJuI8",
    database : "project_rift"
});
db.query("SET time_zone = '+00:00';")
app.set('db', db)

// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);

// Set up our services (see `services/index.js`)
app.configure(services);

// Configure a middleware for the error handler
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;

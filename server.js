'use strict';

function start(callback) {
  // Get dependencies
  const express = require('express');
  const path = require('path');
  const http = require('http');
  const bodyParser = require('body-parser');
  var cookieParser = require('cookie-parser');

  var morgan = require('morgan');
  const mongoose = require('mongoose');
  const helmet = require('helmet');
  const bluebird = require('bluebird');

  // Get our API routes
  const config = require('./config');
  const api = require('./server/routes/api');

  const app = express();
  
  process.on('uncaughtException', function (err) {
    console.error(err);
  });
  
  mongoose.Promise = bluebird;
  mongoose.connect(config.mongo.link);

  // Parsers for POST data
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Point static path to dist
  app.use(express.static(path.join(__dirname, 'dist')));

  // Set our api routes
  //app.use('/api', api);

  // Catch all other routes and return the index file
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
  
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "authorization,content-type,cache-control");
    next();
  });

  /**
   * Get port from environment and store in Express.
   */
  app.set('port', config.server.port);

  /**
   * Create HTTP server.
   */
  const server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(config.server.port, () => 
    console.log(`API running on localhost:${config.server.port}`)
  );

  module.exports = app;

};

var server = start();
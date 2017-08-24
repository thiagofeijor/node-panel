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

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "authorization,content-type,cache-control");
    next();
  });

  app.use(morgan('tiny'));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'dist')));

  app.use('/api', api);

  app.listen(config.server.port, () => 
    console.log(`API running on localhost:${config.server.port}`)
  );

  module.exports = app;

};

var server = start();
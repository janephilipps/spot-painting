// Require modules
var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var enforce = require('express-sslify');
var passport = require('passport');
var isProduction = process.env.NODE_ENV === 'production';
var isStaging = process.env.NODE_ENV === 'staging';
var isHandshake = process.env.NODE_ENV === 'handshake';
var helmet = require('helmet');

var mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true
};

if (isProduction || isStaging) {
  console.log('Connecting to prod mongo.');
  if (!process.env.MONGOLAB_URI) {
    throw new Error('MONGOLAB_URI must be set.');
  }
  mongoose.connect(process.env.MONGOLAB_URI, mongooseOptions);
} else if (isHandshake) {
  console.log('Not connecting to mongo for handshake');
} else {
  console.log('Connecting to dev mongo');
  mongoose.connect('mongodb://localhost:27017/spot_painting_db', mongooseOptions);
}

var app = express();

if (!isHandshake) {

  app.use(helmet());

  if (isProduction) {
    // Force HTTPS
    app.use(enforce.HTTPS({ trustProtoHeader: true }));

    // Trust Heroku's proxy header.
    app.set('trust proxy', 1);
  }

  // MIDDLEWARE

  app.use(bodyParser.json());

  // Parse appication/vnd.api+json as json
  app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

  // Parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(methodOverride('X-HTTP-Method-Override'));

  app.use(express.static(__dirname + '/public'));

  var sessionConfig = {
    secret: 'development',
    resave: false,
    saveUninitialized: true,
    name: 'sessionId',
    cookie: {
      maxAge: 2 * 7 * 24 * 60 * 60 * 1000 // Two weeks
    }
  };

  if (isProduction || isStaging) {
    if (!process.env.SPOT_PAINTING_SECRET) {
      throw new Error('SPOT_PAINTING_SECRET must be set.');
    }

    sessionConfig.cookie.httpOnly = true;
    sessionConfig.secret = process.env.SPOT_PAINTING_SECRET;

    if (isProduction) {
      sessionConfig.cookie.secure = true;
      sessionConfig.cookie.domain = 'www.spot-painting.com';
    } else if (isStaging) {
      sessionConfig.cookie.domain = 'localhost';
    }
  }

  app.use(session(sessionConfig));

  app.use(function printSession(req, res, next) {
    return next();
  });

  app.use(favicon(__dirname + '/public/images/favicon.ico'));

  app.use(passport.initialize());
  app.use(passport.session());

  var routes = require('./routes/index');
  routes(app);
} else {
  var routes = require('./routes/handshake');
  routes(app);
}

// Set port
var port = process.env.PORT || 3000;

app.listen(port);

console.log('Spots beginning to appear on port ' + port);

exports = module.exports = app;

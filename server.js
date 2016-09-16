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

if (isProduction) {
  console.log('Connecting to prod mongo.');
  if (!process.env.MONGOLAB_URI) {
    throw new Error('MONGOLAB_URI must be set.');
  }
  mongoose.connect(process.env.MONGOLAB_URI);
} else {
  console.log('Connecting to dev mongo');
  mongoose.connect('mongodb://localhost:27017/spot_painting_db');
}

var routes = require('./routes/index');

var app = express();

if (isProduction) {
  // Force HTTPS
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

// Set port
var port = process.env.PORT || 3000;

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

if (isProduction) {
  if (!process.env.SPOT_PAINTING_SECRET) {
    throw new Error('SPOT_PAINTING_SECRET must be set.');
  }
  sessionConfig.secret = process.env.SPOT_PAINTING_SECRET;
  sessionConfig.cookie.secure = true;
  sessionConfig.cookie.httpOnly = true;
  sessionConfig.cookie.domain = 'www.spot-painting.com';
}

app.use(session(sessionConfig));

app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use(passport.initialize());
app.use(passport.session());

require('./routes')(app);

app.listen(port);

console.log('Spots beginning to appear on port ' + port);

exports = module.exports = app;

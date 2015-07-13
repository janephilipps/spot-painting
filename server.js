// Require modules
var express = require("express");
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var env = process.env;
var favicon = require('serve-favicon');

// console.log(env.MONGOLAB_URI);
mongoose.connect(env.MONGOLAB_URI);
// Require routes
var routes = require('./routes/index');

// Instantiate express app
var app = express();

// Set port
var port = process.env.PORT || 3000;

// Connect to mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)
// mongoose.connect(db.url);

// MIDDLEWARE

// Get all data/stuff of the body (POST) parameters
// Parse application/json
app.use(bodyParser.json());

// Parse appication/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Override with the X-HTTP-Method-Override header in the request. Simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// Set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// Favicon!
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// Routes
require('./routes')(app); // configure our routes

// Start app
// Startup our app at http://localhost:3000
app.listen(port);

// Shoutout to the user
console.log('Magic happens on port ' + port);

// Expose app
exports = module.exports = app;
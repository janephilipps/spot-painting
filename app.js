// Require modules
var express = require("express");
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Instantiate express app
var app = express();

// Set up MongoDB
var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});

// Start the server
var server = app.listen(process.env.PORT || 3000, function() {
  console.log(new Array(51).join("*"));
  console.log("\t LISTENING ON: \n\t\t localhost:3000");
  console.log(new Array(51).join("*"));
 });
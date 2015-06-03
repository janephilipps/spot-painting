// Grab painting model
var Painting = require('../models/painting');

  module.exports = function (app) {

    // server routes
    // handle things like api calls
    // authentication routes

    // sample api route
    app.get('/api/paintings', function (req, res) {
      // use mongoose to get all paintings in the database
      Painting.find(function(err, paintings) {

        // if there is an error retrieving, send the error.
        // nothing after res.send(err) will execute

        if (err) {
          res.send(err);
        }
        res.json(paintings); // return all paintings in JSON format

      });
    });


    // Route to save painting to DB
    app.post('/api/paintings', function (req, res) {
      // console.log(req.body);
      Painting.create(req.body, function (err, painting) {
        console.log(painting);
      });
    });

    // Route to gallery
    app.get('/paintings', function (req, res) {
      console.log('I made it!');
      Painting.find()
      .then(function (paintings) {
        console.log(paintings);
        res.json(paintings);
      })
    });

    // route to handle creating goes here (app.post)
    // route to handle all angular requests
    app.get('*', function (req, res) {
      res.sendfile('./public/views/index.html');
    });
  };
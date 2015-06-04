// Grab painting model
var Painting = require('../models/painting');

  module.exports = function (app) {

    // server routes
    // handle things like api calls
    // authentication routes

    // sample api route
    // app.get('/api/paintings', function (req, res) {
    //   // use mongoose to get all paintings in the database
    //   Painting.find(function(err, paintings) {

    //     // if there is an error retrieving, send the error.
    //     // nothing after res.send(err) will execute

    //     if (err) {
    //       res.send(err);
    //     }
    //     res.json(paintings); // return all paintings in JSON format

    //   });
    // });


    // Route to save painting to DB
    app.post('/api/paintings', function (req, res) {
      // console.log(req.body);
      Painting.create(req.body, function (err, painting) {
        console.log(painting);
      });
    });

    // Route to gallery
    app.get('/api/paintings', function (req, res) {
      console.log('I made it!');
      Painting.find()
      .then(function (paintings) {
        // Paintings are saved in DB weirdly, so we need to do this to fix them and make accessible
        paintings.forEach(function(painting){
          painting.painting.forEach(function(colorStr,id,arr){
            arr[id] = colorStr.split(",");
          });
        });
        console.log(paintings);
        res.json(paintings);
      })
    });

    // Route to painting
    app.get('/api/paintings/:id', function (req, res) {
      console.log('painting!');
      Painting.find( { _id: req.params.id })
        .then(function (painting) {
          painting[0].painting.forEach(function(colorStr,id,arr){
            arr[id] = colorStr.split(",");
          });
          res.json(painting);
        })
    })

    // route to handle creating goes here (app.post)
    // route to handle all angular requests
    app.get('*', function (req, res) {
      res.sendfile('./public/views/index.html');
    });
  };
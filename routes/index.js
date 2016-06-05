var Painting = require('../models/painting');

  module.exports = function (app) {

    app.post('/api/paintings', function (req, res) {
      Painting.create(req.body, function (err, painting) {
        res.json(painting._id);
      });
    });

    app.get('/api/paintings', function (req, res) {
      Painting.find()
      .then(function (paintings) {
        // Paintings are saved in DB weirdly, so we need to do this to fix them and make accessible
        paintings.forEach(function(painting){
          painting.painting.forEach(function(colorStr,id,arr){
            arr[id] = colorStr.split(",");
          });
        });
        res.json(paintings);
      })
    });

    app.get('/api/paintings/:id', function (req, res) {
      Painting.find( { _id: req.params.id })
        .then(function (painting) {
          painting[0].painting.forEach(function(colorStr,id,arr){
            arr[id] = colorStr.split(",");
          });
          res.json(painting);
        })
    })

    app.get('*', function (req, res) {
      res.sendfile('./public/views/index.html');
    });
  };

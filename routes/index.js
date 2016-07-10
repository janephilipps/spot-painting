var Painting = require('../models/painting');
var User = require('../models/user');
var passport = require('passport');

require('../config/passport')(passport);


  module.exports = function (app) {

    app.post('/api/paintings', function (req, res) {
      var painting = req.body.painting;
      painting.user = req.body.user._id;
      Painting.create(painting, function (err, painting) {
        res.json(painting._id);
      });
    });

    app.get('/api/paintings', function (req, res) {
      var findParam = {};
      if (req.query.user) {
        findParam = {user: req.query.user};
      }

      Painting.find(findParam)
        .populate('user')
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
      Painting.findOne( { _id: req.params.id })
        .populate('user')
        .then(function (painting) {
          painting.painting.forEach(function(colorStr,id,arr){
            arr[id] = colorStr.split(",");
          });
          res.json(painting);
        })
    });

    app.post('/api/signup', passport.authenticate('local-signup'), function (req, res) {
      res.send(req.user);
    });

    app.post('/api/login', passport.authenticate('local-login'), function (req, res) {
      res.send(req.user);
    });

    app.get('/api/users/:id', function (req, res) {
      User.findOne( { _id: req.params.id })
        .then(function (user) {
          res.json(user.safeUser());
        });
    });

    app.get('*', function (req, res) {
      res.sendfile('./public/views/index.html');
    });
  };

var Painting = require('../models/painting');
var User = require('../models/user');
var passport = require('passport');
var path = require('path');

require('../config/passport')(passport);

  module.exports = function (app) {

    var requireLoggedIn = function (req, res, next) {
      if (!req.user) {
        res.send(401, 'Must be logged in');
      } else {
        return next();
      }
    };

    app.post('/api/paintings', requireLoggedIn, function (req, res) {
      var painting = req.body.painting;
      painting.user = req.user._id;
      Painting.create(painting, function (err, painting) {
        res.json(painting._id);
      });
    });

    app.get('/api/paintings', function (req, res) {
      var findParam = {};
      if (req.query.user) {
        findParam = {user: req.query.user};
      }

      var offset  = parseInt(req.query.offset) || 0;
      var limit = Math.min(20, req.query.limit) || 5;

      Painting.find(findParam)
        .populate('user')
        .sort({_id: -1})
        .skip(offset)
        .limit(limit)
        .then(function (paintings) {
          // Paintings are saved in DB weirdly, so we need to do this to fix them and make accessible
          paintings.forEach(function(painting){
            painting.painting.forEach(function(colorStr,id,arr){
              arr[id] = colorStr.split(",");
            });
          });

          return paintings;
        })
        .then(function (paintings) {
          Painting.count(findParam)
            .then(function (total) {
              res.json({
                limit: limit,
                offset: offset,
                count: paintings.length,
                total: total,
                paintings: paintings
              });
            });
        });
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

    app.delete('/api/logout', function (req, res) {
      req.logout();
      res.send({});
    });

    app.get('/api/loggedInUser', function (req, res) {
      res.send(req.user);
    });

    app.get('/api/users/:id', function (req, res) {
      User.findOne( { _id: req.params.id })
        .then(function (user) {
          res.json(user.safeUser());
        });
    });

    app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, '../public', 'views', 'index.html'));
    });

  };

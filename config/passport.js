var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

module.exports = function (passport) {
    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {
            var newUser;

            User.findOne({ email: email }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, false);
                } else {
                    newUser = new User();
                    newUser.email = email;
                    newUser.passwordHash = newUser.generateHash(password);
                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        } else {
                            return done(null, newUser);
                        }
                    })
                }
            })
        }
    ));

    passport.serializeUser(function (user, done) {
      done(null, user);
    });

    passport.deserializeUser(function (user, done) {
      done(null, user);
    });
};

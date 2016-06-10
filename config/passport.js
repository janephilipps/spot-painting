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
                    done(err);
                }
                if (user) {
                    done(null, false);
                } else {
                    newUser = new User();
                    newUser.email = email;
                    newUser.passwordHash = newUser.generateHash(password);
                    newUser.save(function (err) {
                        if (err) {
                            done(err);
                        } else {
                            done(null, newUser.email);
                        }
                    });
                }
            });
        }
    ));

    passport.use('local-login', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {
            User.findOne({ email: email }, function (err, user) {
                if (err) {
                    done(err);
                }
                if (user) {
                    if (user.isValidPassword(password)) {
                        done(null, user.email);
                    } else {
                        done(null, false);
                    }
                } else {
                    done(null, false);
                }
            });
        }
    ));

    passport.serializeUser(function (user, done) {
      done(null, user);
    });

    passport.deserializeUser(function (user, done) {
      done(null, user);
    });
};

var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

module.exports = function (passport) {
    passport.use('local-signup', new LocalStrategy(
        {
            passReqToCallback: true
        },
        // LocalStrategy requires 4 params here, but we are
        // getting everything we need from `req`, so 2 are unused.
        function (req, unusedUser, unusedPassword, done) {
            var newUser,
                email = req.body.email,
                username = req.body.username,
                password = req.body.password;

            if (!email || !username || !password) {
                return done(null, false);
            }

            User.count({$or: [{email: email}, {username: username}]}, function (err, count) {
                if (err) {
                    done(err);
                } else if (count > 0) {
                    done(null, false);
                } else {
                    newUser = new User();
                    newUser.email = email;
                    newUser.username = username;
                    newUser.passwordHash = newUser.generateHash(password);
                    newUser.save(function (err) {
                        if (err) {
                            done(err);
                        } else {
                            done(null, newUser.safeUser());
                        }
                    });
                }
            });
        }
    ));

    passport.use('local-login', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        function (username, password, done) {
            User.findOne({$or: [{email: username}, {username: username}]}, function (err, user) {
                if (err) {
                    done(err);
                }
                if (user) {
                    if (user.isValidPassword(password)) {
                        done(null, user.safeUser());
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

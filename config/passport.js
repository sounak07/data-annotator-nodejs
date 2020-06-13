const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const User = mongoose.model('users');
const config = require('config');
const secret = config.get('secret');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

module.exports = (passport) => {
  passport.use('jwtuser',
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }

          return done(null, false);
        })
        .catch((e) => {
          res.json({
            error: e,
          });
        });
    })
  );

  passport.use('jwtadmin',
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user && jwt_payload.isAdmin === true) {
            return done(null, user);
          }

          return done(null, false);
        })
        .catch((e) => {
          res.json({
            error: e,
          });
        });
    })
  );
};

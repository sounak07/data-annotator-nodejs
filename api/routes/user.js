const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('secret');
const passport = require('passport');

const validationRegisterInput = require('../../validations/register');
const validationLoginInput = require('../../validations/login');

//USER register route

router.post('/register', (req, res) => {
  const { errors, isValid } = validationRegisterInput(req.body, 'signup');

  if (!isValid) {
    return res.status(400).json(errors);
  }


  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        errors.email = 'Email exists';
        res.status(400).json(errors);
      } else {
        const newUser = new User({
          email: req.body.email,
          password: req.body.password,
          isAdmin: false
        });

        bcryptjs.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcryptjs.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((doc, err) => {
                if (err) {
                  res.status(400).json({
                    error: e,
                  });
                } else {
                  res.status(200).json({
                    email: doc.email,
                  });
                }
              })
              .catch((e) => {
                res.status(400).json({
                  error: e,
                });
              });
          });
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });
});

//User login route

router.post('/login', (req, res) => {
  const { errors, isValid } = validationLoginInput(req.body, 'login');

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      errors.email = 'Not found';

      res.status(404).json(errors);
    }

    bcryptjs.compare(req.body.password, user.password).then((passMatch) => {
      if (passMatch) {
        const payLoad = {
          id: user._id,
          email: user.email,
          isAdmin: user.isAdmin
        };

        jwt.sign(payLoad, secret, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            token: `Bearer ${token}`,
          });
        });
      } else {
        errors.password = 'Incorrect password';
        return res.status(404).json(errors);
      }
    });
  });
});

module.exports = router;

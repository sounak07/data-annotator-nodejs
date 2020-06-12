const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Image = require("../../models/Image");
const Annotations = require("../../models/Annotations");
const passport = require('passport');


router.post('/add', passport.authenticate("jwt", { session: false }), (req, res) => {

  Annotations.findOne({ user: req.user.id }).then((anno) => {
    if (!anno) {

      let incomingAnnote = [];

      incomingAnnote.push(req.body);

      const newAnnote = new Annotations({
        user: req.user.id,
        userEmail: req.user.email,
        annotations: incomingAnnote
      })

      newAnnote.save().then((doc) => {
        res.status(200).json({
          success: true,
          doc: doc
        });
      }).catch(e => {
        res.status(200).json({
          error: e
        });
      })

    } else {
      let incomingAnnote = [];

      incomingAnnote.push(req.body);

      anno.annotations = [...anno.annotations, ...incomingAnnote];

      anno.save().then((doc) => {
        res.status(200).json({
          success: true,
          doc: doc
        });
      }).catch(e => {
        res.status(200).json({
          error: e
        });
      })
    }

  }).catch(e => {
    res.status(400).json({
      error: e
    });
  })
});


router.get('/', passport.authenticate("jwt", { session: false }), (req, res) => {

  Annotations.findOne({ user: req.user.id }).then((anno) => {

    if (anno) {
      if (anno.length == 0) {
        res.status(204).json({
          error: "No Annotations found"
        });
      }

      res.status(200).json(anno.annotations);
    } else {
      res.status(404).json({
        error: "No Annotations yet"
      });
    }

  })

});

router.get('/all', passport.authenticate("jwt", { session: false }), (req, res) => {

  Annotations.find({}).then((anno) => {

    if (anno) {
      if (anno.length == 0) {
        res.status(204).json({
          error: "No Annotations found"
        });
      }

      res.status(200).json(anno);
    } else {
      res.status(404).json({
        error: "No Annotations yet"
      });
    }

  })


})

module.exports = router;


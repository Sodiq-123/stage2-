var express = require('express');
var router = express.Router();
var Contact = require('../models/contact');

/* Home page */
router.get('/', function(req, res) {
  res.render('main');
});

/* Contact Form */
router.post('/contact', function(req, res) {
  var contact = new Contact();
  contact.name = req.body.name;
  contact.email = req.body.email;
  contact.message = req.body.message;
  if (contact.name && contact.email && contact.message) {
    contact.save(function(err) {
      if (err) {
        console.log(err);
        res.render('main', {
          error: 'Something went wrong. Please try again.'
        });
      } else {
        res.render('main', {
          success: 'Message Sent Successfully'
        });
      }
    });
  }
  return res.render('main', {
    error: 'Please fill all the fields.' 
  });
});

module.exports = router;

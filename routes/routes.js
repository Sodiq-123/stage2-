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
        return res.redirect('main', {
          error: 'Something went wrong. Please try again.'
        })
      }
      return res.redirect('/');
    });
  }
  else {
    return res.redirect('main')
  }
});

module.exports = router;

var express = require('express');
var router = express.Router();
const { asyncHandler, csrfProtection } = require('./utils');
const db = require('../db/models')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', csrfProtection, (req, res) => {
  res.render('user-login', {
    title: "Login",
    csrfToken: req.csrfToken()
  });
});

router.get('/register', csrfProtection, (req, res) => {
  const user = db.User.build();
  res.render('user-register', {
    title: 'Register',
    user,
    csrfToken: req.csrfToken()
  });
});


module.exports = router;

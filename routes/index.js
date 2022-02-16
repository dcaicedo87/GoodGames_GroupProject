var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log('inside page');
  res.render("splash-page");

});

module.exports = router;

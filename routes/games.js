var express = require("express");
var router = express.Router();
const { asyncHandler, csrfProtection } = require("./utils");
const db = require("../db/models");
const { requireAuth } = require("../auth");

router.get("/", requireAuth, (req, res) => {
  res.send("You are AUTHORIZED");
});
module.exports = router;

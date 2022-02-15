var express = require("express");
var router = express.Router();
const { asyncHandler, csrfProtection } = require("./utils");
const db = require("../db/models");
const { requireAuth } = require("../auth");

router.get("/", (req, res) => {
  const user = res.locals.user;
  res.render("games-page", { user });
});
module.exports = router;

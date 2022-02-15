var express = require("express");
var router = express.Router();
const { asyncHandler, csrfProtection } = require("./utils");
const db = require("../db/models");
const { requireAuth } = require("../auth");

router.get("/", asyncHandler(async(req, res) => {
  const user = res.locals.user;
  const games = await db.Game.findAll({ order: [['title', 'ASC']]})
  res.render("games-page", { user, games });
}));

module.exports = router;

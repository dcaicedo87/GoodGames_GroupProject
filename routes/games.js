var express = require("express");
var router = express.Router();
const { asyncHandler, csrfProtection } = require("./utils");
const db = require("../db/models");
const { requireAuth } = require("../auth");

router.get("/", (req, res) => {
  const user = res.locals.user;
  res.render("games-page", { user });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id
  const user = res.locals.user;
  const game = await db.Game.findByPk(id)
  res.render("game-info", { game, user })
});

module.exports = router;

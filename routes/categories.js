var express = require("express");
var router = express.Router();
const { asyncHandler, csrfProtection } = require("./utils");
const db = require("../db/models");
const { requireAuth } = require("../auth");
const { Category, Game } = require("../db/models");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const user = res.locals.user;
    const games = await db.Game.findAll({ order: [["title", "ASC"]] });
    const gameshelves = await db.Gameshelf.findAll({
      where: { userId: `${user.id}` },
    });

    res.render("games-page", { games, user, gameshelves });
  })
);

router.get(
  "/test",
  asyncHandler(async (req, res) => {
    res.render("BACKUP");
  })
);

router.get("/:id", csrfProtection, async (req, res) => {
  const id = req.params.id;
  const user = res.locals.user;
  if (user) {
    const gameshelves = await db.Gameshelf.findAll({
      where: { userId: `${user.id}` },
    });
    const games = await db.Game.findAll({
      where: {
        genreId: id,
      },
    });
    res.render("games-page", { games, user, gameshelves, csrfToken: req.csrfToken() });
  } else {
    const games = await db.Game.findAll({
      where: {
        genreId: id,
      },
    });
    res.render("games-page", { games, user, csrfToken: req.csrfToken() });
  }
});

module.exports = router;

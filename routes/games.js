var express = require("express");
var router = express.Router();
const { asyncHandler, csrfProtection } = require("./utils");
const db = require("../db/models");
const { requireAuth } = require("../auth");
const { User } = require('../db/models')

router.get("/", asyncHandler(async(req, res) => {
  const user = res.locals.user;
  const games = await db.Game.findAll({ order: [['title', 'ASC']]})
  res.render("games-page", { user, games });
}));

router.get("/:id", csrfProtection, asyncHandler(async (req, res) => {
  const id = req.params.id
  const user = res.locals.user;
  try {
    const game = await db.Game.findByPk(id)
    const reviews = await db.Review.findAll({
      where: {
        gameId: id
      },
      order: [['createdAt', 'ASC']],
      include: {
        model: User,
      }
    });
    if (game) {
      res.render("game-info", { game, user, reviews, csrfToken: req.csrfToken() })
    } else {
      throw err
    }
  } catch (err) {
    res.render('error-pug.pug');
  }
}));

module.exports = router;

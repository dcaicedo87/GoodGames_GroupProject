var express = require("express");
var router = express.Router();
const { asyncHandler, csrfProtection } = require("./utils");
const db = require("../db/models");
// const Review = require('../db/models')
const { requireAuth } = require("../auth");
const { Review } = require('../db/models')
router.get("/", (req, res) => {
  const user = res.locals.user;
  res.render("games-page", { user });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id
  const user = res.locals.user;
  const game = await db.Game.findByPk(id, {
    include: {
      model: Review,
      where: {
        gameId: id
      }
    }
  })
  const reviewContent = game.Reviews[0].content;
  res.render("game-info", { game, reviewContent })
});

module.exports = router;

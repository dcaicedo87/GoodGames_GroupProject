var express = require("express");
var router = express.Router();
const { asyncHandler, csrfProtection } = require("./utils");
const db = require("../db/models");
// const Review = require('../db/models')
const { requireAuth } = require("../auth");
const { Review, User } = require('../db/models')

router.get("/", asyncHandler(async(req, res) => {
  const user = res.locals.user;
  const games = await db.Game.findAll({ order: [['title', 'ASC']]})
  res.render("games-page", { user, games });
}));

router.get("/:id", async (req, res) => {
  const id = req.params.id
  const user = res.locals.user;
  const game = await db.Game.findByPk(id, {
    include:
      {
        model: Review,
        where: {
          gameId: id
        },
        include: {
          model: User,
          where: {
            id
          }
        }
      },
  })
  const reviewContent = game.Reviews[0].content;
  const username = game.Reviews[0].User.username;
  // const reviewContent = game.Reviews[0].content;
  res.render("game-info", { game, reviewContent, username })
});


module.exports = router;

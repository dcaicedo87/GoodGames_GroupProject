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

router.get("/:id", csrfProtection, asyncHandler(async (req, res) => {
  const id = req.params.id
  const user = res.locals.user;
  const game = await db.Game.findByPk(id, {
    include:
      {
        model: Review,
        order: [['createdAt', 'ASC']],
        where: {
          gameId: id
        },
        include: {
          model: User,
        }
      },
  })
  const reviews = game.Reviews;
  // console.log(reviews);
 const reviews2 = reviews.map(review => {
   const time = review.createdAt.toString();
   const newTime = time.slice(0, 16);
   review.newTime = newTime
 });

  res.render("game-info", { game, reviews, user, csrfToken: req.csrfToken() })
  // const reviewContent = game.Reviews[0].content;
  // const username = game.Reviews[0].User.username;
  // const reviewContent = game.Reviews[0].content;
}));


module.exports = router;

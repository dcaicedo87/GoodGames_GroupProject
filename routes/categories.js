var express = require("express");
var router = express.Router();
const { asyncHandler, csrfProtection } = require("./utils");
const db = require("../db/models");
const { requireAuth } = require("../auth");
const { Category, Game } = require("../db/models");

// router.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     const user = res.locals.user;
//     const games = await db.Game.findAll({ order: [["title", "ASC"]] });
//     res.render("games-page", { user, games });
//   })
// );

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const categories = await db.Category.findByPk(id, {
    include: {
      model: Game,
      where: {
        genreId: id,
      },
    },
  });
  console.log(categories.Games[0].id);

  //   const gameTitle = categories.Games[0].title;
  //   const gameUrl = categories.Games[0].url;
  //   const gameId = categories.Games[0].id;

  res.render("category-filter-page", { categories });
});

module.exports = router;

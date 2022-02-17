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
  const games = await db.Game.findAll({
    where: {
      genreId: id,
    },
  });

  res.render("category-filter-page", { games });
});

module.exports = router;

var express = require("express");
var router = express.Router();
var Sequelize = require('sequelize');
const { asyncHandler, csrfProtection } = require("./utils");
const db = require("../db/models");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { loginUser, logoutUser } = require("../auth");

router.post(
  "/",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { gameShelfName } = req.body;
    const user = res.locals.user;

    const gameShelf = await db.Gameshelf.create({
      name: gameShelfName,
      userId: user.id,
    });
    res.redirect("/games");
  })
);

router.post(
    "/create",
    csrfProtection,
    asyncHandler(async (req, res) => {
      const { gameShelfName } = req.body;
      const user = res.locals.user;

      const gameShelf = await db.Gameshelf.create({
        name: gameShelfName,
        userId: user.id,
      });
      res.redirect("/games");
    })
);

router.get("/:id", async(req, res) => {
    const id = req.params.id
    const user = res.locals.user;
    var Op = Sequelize.Op;
    const gamejoins = await db.Gamejoin.findAll({where: { gameShelfId: `${id}` }})


    //const games = await db.Game.findAll({ where: { Id: {[Op.in]: arr } } } )
    const gameshelves = await db.Gameshelf.findAll({where: { userId: `${user.id}` }})
    let GameIdArr = [];

    console.log(id, 'THIS TEXT IS FOR YOU TO FIND IT IN THE STACK OF SHIT!');

    for (let i = 0; i < gamejoins.length; i++) {
        let currentGameID = gamejoins[i].gameId;

        GameIdArr.push(currentGameID);

    }

    const games = await db.Game.findAll({where: { id: {[Op.in]: GameIdArr} }})

    res.render("games-page", { gamejoins, games, user, gameshelves })


});
module.exports = router;

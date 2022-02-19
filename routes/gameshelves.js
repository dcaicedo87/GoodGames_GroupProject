var express = require("express");
var router = express.Router();
var Sequelize = require('sequelize');
const { asyncHandler, csrfProtection } = require("./utils");
const db = require("../db/models");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { loginUser, logoutUser } = require("../auth");
var curGameShelfId = null;

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

        const { Gameshelves } = req.body
        console.log('THIS IS WHAT I WNAT TO SEE OH OMY GOD',Gameshelves)
        let data = Gameshelves.split('-')
        let gameShelfId = data[0]
        let gameId = data[1]
        const user = res.locals.user;
        const gameJoin = await db.Gamejoin.create({
            gameShelfId,
            gameId
          });

        //res.redirect(`/games`);
        // const gameShelf = await db.Gameshelf.create({
        //   name: gameShelfName,
        //   userId: user.id,
        // });
        // res.redirect("/games");
    })
);

router.get("/:id", csrfProtection, async(req, res) => {
    const id = req.params.id
    const user = res.locals.user;
    var Op = Sequelize.Op;
    const gamejoins = await db.Gamejoin.findAll({where: { gameShelfId: `${id}` }})


    //const games = await db.Game.findAll({ where: { Id: {[Op.in]: arr } } } )
    const gameshelves = await db.Gameshelf.findAll({where: { userId: `${user.id}` }})
    let GameIdArr = [];


    for (let i = 0; i < gamejoins.length; i++) {
        let currentGameID = gamejoins[i].gameId;

        GameIdArr.push(currentGameID);

    }
    let inGameShelf = 'YES!'
    const games = await db.Game.findAll({where: { id: {[Op.in]: GameIdArr} }})
    curGameShelfId = id
    res.render("games-page", { gamejoins, games, user, gameshelves, csrfToken: req.csrfToken(), inGameShelf })

});

router.post(
    "/edit",
    csrfProtection,
    asyncHandler(async (req, res) => {

        const { Gameshelves } = req.body
        console.log('THIS IS WHAT I WNAT TO SEE OH OMY GOD',Gameshelves)
        let data = Gameshelves.split('-')
        let gameShelfId = data[0]
        let gameId = data[1]
        const user = res.locals.user;

        db.Gamejoin.destroy({where: {gameShelfId, gameId}})
        res.redirect(`/gameshelves/${gameShelfId}`);
        //res.redirect(`/gameshelves/${gameShelfId}`);
        // const gameShelf = await db.Gameshelf.create({
        //   name: gameShelfName,
        //   userId: user.id,
        // });
        // res.redirect("/games");
    })
);

router.post(
    "/delete",
    asyncHandler(async (req, res) => {



        const user = res.locals.user;
        const gameshelf = await db.Gameshelf.findAll({where: { userId: user.id} })


        db.Gamejoin.destroy({where: { gameShelfId: curGameShelfId }});

        db.Gameshelf.destroy({ where: { id: curGameShelfId }});

        res.redirect("/games");

        // const gameShelf = await db.Gameshelf.create({
        //   name: gameShelfName,
        //   userId: user.id,
        // });
        // res.redirect("/games");
    })
);

module.exports = router;

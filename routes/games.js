var express = require("express");
var router = express.Router();
var Sequelize = require('sequelize');
const { asyncHandler, csrfProtection } = require("./utils");
const db = require("../db/models");
// const Review = require('../db/models')
const { requireAuth } = require("../auth");
const { Review, User } = require("../db/models");

router.get(
  "/",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const user = res.locals.user;
    const games = await db.Game.findAll({ order: db.sequelize.random() });
    if (user) {
      const gameshelves = await db.Gameshelf.findAll({
        where: { userId: `${user.id}` },
      });
      res.render("games-page", {
        user,
        games,
        gameshelves,
        csrfToken: req.csrfToken(),
      });
    } else {
      res.render("games-page", { user, games, csrfToken: req.csrfToken() });
    }
  })
);

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = res.locals.user;
  const game = await db.Game.findByPk(id, {
    include: {
      model: Review,
      where: {
        gameId: id,
      },
      include: {
        model: User,
        where: {
          id,
        },
      },
  }})


const reviewContent = game.Reviews[0].content;
const username = game.Reviews[0].User.username;



  // const reviewContent = game.Reviews[0].content;
  res.render("game-info", { game, reviewContent, username });
});

// router.get("/gameshelf/create", csrfProtection, ((req, res) => {

// }));

router.get("/gameshelf/:id", async(req, res) => {
    const id = req.params.id
    const user = res.locals.user;
    var Op = Sequelize.Op;
    const gamejoins = await db.Gamejoin.findAll({where: { gameShelfId: `${id}` }})


    //const games = await db.Game.findAll({ where: { Id: {[Op.in]: arr } } } )
    const gameshelves = await db.Gameshelf.findAll({where: { userId: `${user.id}` }})
    let GameIdArr = [];

    console.log(id, 'THIS TEXT IS FOR YOU TO FIND IT IN THE STACK OF SHIT!');
    // console.log(gameJoinz);
    // gameJoinzID = gameJoinz['fulfillmentValue']
    // console.log(gameJoinzID)
    for (let i = 0; i < gamejoins.length; i++) {
        let currentGameID = gamejoins[i].gameId;

        GameIdArr.push(currentGameID);

    }

    const games = await db.Game.findAll({where: { id: {[Op.in]: GameIdArr} }})

    res.render("games-page", { gamejoins, games, user, gameshelves })


});

module.exports = router;
// router.get("/register", csrfProtection, (req, res) => {
//     const user = db.User.build();
//     res.render("user-register", {
//         title: "Register",
//         user,
//         csrfToken: req.csrfToken(),
//     });
// });

// router.post(
//     "/register",
//     csrfProtection,
//     userValidators,
//     asyncHandler(async (req, res) => {
//         const { email, username, password } = req.body;

//         const user = db.User.build({
//             email,
//             username,
//         });

//         const validatorErrors = validationResult(req);
//         if (validatorErrors.isEmpty()) {
//             const hashedPass = await bcrypt.hash(password, 11);
//             user.hashedPass = hashedPass;
//             await user.save();
//             loginUser(req, res, user);
//             const { userId } = req.session.auth;
//             defaultGameJoinzes(req,res,userId);
//             res.redirect("/games");
//         } else {
//             const errors = validatorErrors.array().map((error) => error.msg);
//             res.render("user-register", {
//                 title: "Register",
//                 user,
//                 errors,
//                 csrfToken: req.csrfToken(),
//             });
//         }
//     })
// );

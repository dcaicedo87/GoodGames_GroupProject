var express = require("express");
var router = express.Router();
const { asyncHandler, csrfProtection } = require("./utils");
const db = require("../db/models");
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
    res.render('error-404');
  }
}));

// router.get("/gameshelf/create", csrfProtection, ((req, res) => {

// }));

router.get("/gameshelf/:id", async (req, res) => {
  const id = req.params.id;
  const user = res.locals.user;
  const gameshelves = await db.Gameshelf.findAll({
    where: { userId: `${user.id}` },
  });
  console.log(id);
  const gamejoins = db.Gamejoin.findAll({ where: { gameShelfId: `${id}` } });
  console.log(gamejoins);

  //for (let i = 0; )
  //const games = db.Game.findAll({where: { gameShelfId: {[Op.in]: ARR]} }})
  if (gamejoins) {
    res.render("games-page", { gamejoins, games, user, gameshelves });
  } else {
    window.alert("This gameshelf is empty, Go fill it with some games DAMNIT!");
  }
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
//             defaultGameShelves(req,res,userId);
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

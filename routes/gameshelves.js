var express = require("express");
var router = express.Router();
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

module.exports = router;

var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { asyncHandler, csrfProtection } = require("./utils");
const db = require("../db/models");

router.post('/', asyncHandler(async (req, res) => {
    const {
        content,
        gameId
    } = req.body

    const user = res.locals.user;
    const userId = user.id;
    const username = user.username;
    let newReview = await db.Review.create({
        content,
        gameId,
        userId
    });
    newReview.dataValues.username = username;
    res.json({ newReview })
}));




module.exports = router;

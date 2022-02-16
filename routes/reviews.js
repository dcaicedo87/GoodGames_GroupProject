var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { asyncHandler, csrfProtection } = require("./utils");
const db = require("../db/models");

router.post('/', csrfProtection, asyncHandler(async (req, res) => {
    const {
        content,
        userId,
        gameId
    } = req.body;
    const newReview = await db.Review.create({
        content,
        userId,
        gameId
    });
}));






module.exports = router;

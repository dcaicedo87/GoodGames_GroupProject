var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { asyncHandler, csrfProtection } = require("./utils");
const db = require("../db/models");
const cors = require('cors');
var corsOptions = {
    origin: 'https://aa-ggames.herokuapp.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

router.post('/', cors(corsOptions), asyncHandler(async (req, res) => {
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


router.delete('/:id', cors(corsOptions), asyncHandler(async (req, res) => {
   const id = req.params.id;
   try {
       const review = await db.Review.findByPk(id);
       if (review) {
           await review.destroy();
           const success = "Delete successful."
           res.json({ success })
       } else {
           throw err
       }
   } catch (err) {
    const failure = "Delete failed."
    res.json({ failure })
   }
}));

router.put('/:id', cors(corsOptions), asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { content } = req.body;
    try {
        const review = await db.Review.findByPk(id);
        if (review && content) {
            review.content = content;
            await review.save();
            const success = "Edit successful."
            res.json({ success })
        } else {
            throw err
        }
    } catch (err) {
        const failure = "Edit failed."
        res.json({ failure })
    }
}));

module.exports = router;

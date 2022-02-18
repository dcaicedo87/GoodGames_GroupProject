var express = require("express");
var router = express.Router();
const { asyncHandler, csrfProtection } = require("./utils");
const db = require("../db/models");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { loginUser, logoutUser, restoreUser } = require("../auth");

const userValidators = [
    check("username")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a value for Username")
        .isLength({ max: 100 })
        .withMessage("First Name must not be more than 100 characters long.")
        .custom((value) => {
            return db.User.findOne({ where: { username: value } }).then((user) => {
                if (user) {
                    return Promise.reject(
                        "The provided Username is already in use by another account."
                    );
                }
            });
        }),
    check("email")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a value for Email")
        .isLength({ max: 100 })
        .withMessage("Email must not be more than 100 characters long.")
        .isEmail()
        .withMessage("Email is not a valid email")
        .custom((value) => {
            return db.User.findOne({ where: { email: value } }).then((user) => {
                if (user) {
                    return Promise.reject(
                        "The provided Email is already in use by another account."
                    );
                }
            });
        }),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a value for Password")
        .isLength({ max: 50 })
        .withMessage("Password must not be more than 50 characters long.")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
        .withMessage(
            'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
        ),
    check("confirmPassword")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a value for Confirm Password.")
        .isLength({ max: 50 })
        .withMessage("Confirm Password must not be more than 50 characters long.")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Confirm Password does not match Password.");
            }
            return true;
        }),
];

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

router.get("/login", csrfProtection, (req, res) => {
    res.render("user-login", {
        title: "Login",
        csrfToken: req.csrfToken(),
    });
});

router.get("/register", csrfProtection, (req, res) => {
    const user = db.User.build();
    res.render("user-register", {
        title: "Register",
        user,
        csrfToken: req.csrfToken(),
    });
});

router.post(
    "/register",
    csrfProtection,
    userValidators,
    asyncHandler(async (req, res) => {
        const { email, username, password } = req.body;

        const user = db.User.build({
            email,
            username,
        });

        const validatorErrors = validationResult(req);
        if (validatorErrors.isEmpty()) {
            const hashedPass = await bcrypt.hash(password, 11);
            user.hashedPass = hashedPass;
            await user.save();
            loginUser(req, res, user);
            const { userId } = req.session.auth;
            defaultGameShelves(req,res,userId);
            res.redirect("/games");
        } else {
            const errors = validatorErrors.array().map((error) => error.msg);
            res.render("user-register", {
                title: "Register",
                user,
                errors,
                csrfToken: req.csrfToken(),
            });
        }
    })
);

const loginValidators = [
    check("username")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a value for Username"),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a value for Password"),
];

router.post(
    "/login",
    csrfProtection,
    loginValidators,
    asyncHandler(async (req, res) => {
        const { username, password } = req.body;

        let errors = [];
        const validatorErrors = validationResult(req);

        if (validatorErrors.isEmpty()) {
            const user = await db.User.findOne({ where: { username } });

            if (user !== null) {
                const passwordMatch = await bcrypt.compare(
                    password,
                    user.hashedPass.toString()
                );

                if (passwordMatch) {
                    loginUser(req, res, user);
                    return res.redirect("/games");
                }
            }

            errors.push("Login failed for the provided email address and password");
        } else {
            errors = validatorErrors.array().map((error) => error.msg);
        }
        res.render("user-login", {
            title: "Login",
            username,
            errors,
            csrfToken: req.csrfToken(),
        });
    })
);

router.post("/logout", (req, res) => {
    logoutUser(req, res);
    res.redirect("/");
});

let defaultGameShelves = asyncHandler(async (req,res,userId) => {
    const gameshelfOne = db.Gameshelf.build({
        name: 'Currently Playing',
        userId
    });

    const gameshelfTwo = db.Gameshelf.build({
        name: 'Want to Play',
        userId
    });

    const gameshelfThree = db.Gameshelf.build({
        name: 'Have Played',
        userId
    });

    await gameshelfOne.save();
    await gameshelfTwo.save();
    await gameshelfThree.save();
})
module.exports = router;

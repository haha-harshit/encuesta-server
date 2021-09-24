const express = require("express");

// import router
const router = express.Router();

// importing express-validator
const { body } = require("express-validator");

// make route for auth controller
const authController = require("../../controllers/api/auth");

// declaring route for auth to be acccessed
router.get("/", authController.auth);

// creating user
router.post(
    "/create-user",
    [
        body("name", "Enter a valid name").isLength({ min: 3 }),
        body("email", "Enter a valid name").isEmail(),
        body("password", "Password must be of atleast 5 characters").isLength({
            max: 5,
        }),
    ],
    authController.create_user
);

// export route
module.exports = router;

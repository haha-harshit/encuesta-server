const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// make route for auth controller
const authController = require("../../controllers/api/auth");

// declaring route for auth to be acccessed
router.get("/", authController.main);
router.get("/test", authController.test);

// creating user
router.post(
    "/create-user",
    [
        body("name", "Enter a valid name").isLength({ min: 3 }),
        body("email", "Enter a valid name").isEmail(),
        body("password", "Password must be of atleast 5 characters").isLength({
            min: 5,
        }),
    ],
    authController.create_user
);

// export route
module.exports = router;

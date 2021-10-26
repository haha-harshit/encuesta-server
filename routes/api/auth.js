const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// make route for auth controller
const authController = require("../../controllers/api/auth");

// declaring route for auth to be acccessed
router.get("/", authController.main);
router.get("/test", authController.test);

//ROUTE 1: CREATE_USER -noLoginRequired *** {POST}->"api/auth/create-user" ***
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

// ROUTE 2: LOGIN_USER -noLoginRequired *** {POST}->"api/auth/login-user" ***
router.post(
    "/login-user",
    [
        body("email", "Enter a valid E-Mail").isEmail(),
        body("password", "Password cannot be blank").exists(),
    ],
    authController.login_user
);

// ROUTE 3: GET_LOGGED_IN_USER_DETAILS -LoginRequired *** {POST}->"api/auth/get-user" ***
// router.post("/get-user", authController.get_user);

// export route
module.exports = router;

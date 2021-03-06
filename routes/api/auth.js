const express = require("express");
const router = express.Router();

const passport = require("passport");

// require middleware - fetchUser to check logged in? {logged in user only}
const fetchUser = require("../../middlewares/fetchUser");

const { body } = require("express-validator");
// make route for auth controller
const authController = require("../../controllers/api/auth");

router.get("/sign-up", authController.sign_up);
router.get("/log-in", authController.log_in);

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

// ROUTE 2: LOGIN_USER -noLoginRequired *** {POST}->"api/auth/create-session" ***
router.post(
    "/create-session",
    passport.authenticate("local", { failureRedirect: "/api/auth/log-in" }),
    authController.create_session
);

// ROUTE 3: DESTROY_SESSION -LoginRequired *** {POST}->"api/auth/destroy-session" ***
router.get(
    "/destroy-session",
    passport.checkAuthentication,
    authController.destroy_session
);

// ROUTE 4: GET_LOGGED_IN_USER_DETAILS -LoginRequired *** {POST}->"api/auth/get-user" ***
// router.get("/get-user", authController.get_user);
// router.post("/get-user", fetchUser, authController.get_user);

// export route
module.exports = router;

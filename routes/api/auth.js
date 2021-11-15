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

// ROUTE 2: LOGIN_USER -noLoginRequired *** {POST}->"api/auth/login-user" ***
router.post(
    "/create-session",
    [
        body("email", "Enter a valid E-Mail").isEmail(),
        body("password", "Password cannot be blank").exists(),
    ],
    passport.authenticate("local", { failureRedirect: "/log-in" }),
    authController.create_session
);

// ROUTE 3: CREATE_SESSION -LoginRequired *** {POST}->"api/auth/createSession" ***
// router.post('/create-session', )

// ROUTE 4: GET_LOGGED_IN_USER_DETAILS -LoginRequired *** {POST}->"api/auth/get-user" ***
router.post("/get-user", fetchUser, authController.get_user);

// export route
module.exports = router;

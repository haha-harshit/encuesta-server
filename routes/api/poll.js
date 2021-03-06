const express = require("express");
const passport = require("passport");
const router = express.Router();
// require middleware - fetchUser to check logged in? {logged in user only}
const fetchUser = require("../../middlewares/fetchUser");

// const { body } = require("express-validator");

const pollController = require("../../controllers/api/poll");

// ROUTE 1: DISPLAY ALL POLLS  *** {GET}->"api/poll/all-polls" *** LOGIN REQUIRED
router.get("/all-polls", pollController.polls);

// ROUTE 2: DISPLAY ALL CREATED POLLS  *** {GET}->"api/poll/created-polls" *** LOGIN REQUIRED
router.get(
    "/created-polls",
    passport.checkAuthentication,
    pollController.createdPolls
);

// ROUTE 3: DISPLAY ALL PARTICIPATED POLLS  *** {GET}->"api/poll/participated-polls" *** LOGIN REQUIRED
router.get(
    "/participated-polls",
    passport.checkAuthentication,
    pollController.participatedPolls
);

//ROUTE 4: POST A POLL ***{POST}--> "api/poll/add-poll" LOGIN REQUIRED
// router.post(
//     "/add-poll",
//     [
//         body("description", "Enter a valid description"),
//         body("option", "Enter a valid option"),
//     ],
//     fetchUser,
//     pollController.addPoll
// );

// ROUTE FOR POLL FORM {GET  FORM}
router.get("/add-poll", passport.checkAuthentication, pollController.pollForm);

// ROUTE FOR CREATING POLL {POST}
router.post("/add-poll", passport.checkAuthentication, pollController.addPoll);

module.exports = router;

const express = require("express");
const router = express.Router();

// require middleware - fetchUser to check logged in? {logged in user only}
const fetchUser = require("../../middlewares/fetchUser");

const pollController = require("../../controllers/api/poll");

// ROUTE 1: DISPLAY ALL POLLS
router.get("/polls", fetchUser, pollController.polls);

// ROUTE 2: DISPLAY ALL CREATED POLLS
router.get("/createdPolls", fetchUser, pollController.createdPolls);

// ROUTE 3: DISPLAY ALL PARTICIPATED POLLS
router.get("/participatedPolls", fetchUser, pollController.participatedPolls);
module.exports = router;

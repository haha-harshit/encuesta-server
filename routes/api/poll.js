const express = require("express");
const router = express.Router();

// require middleware - fetchUser to check logged in? {logged in user only}
const fetchUser = require("../../middlewares/fetchUser");

const pollController = require("../../controllers/api/poll");

router.get("/polls", fetchUser, pollController.polls);

module.exports = router;

const express = require("express");
const router = express.Router();

// require middleware - fetchUser to check logged in? {logged in user only}
const fetchUser = require("../../middlewares/fetchUser");

const pollController = require("../../controllers/api/poll");

// ROUTE 1: DISPLAY ALL POLLS  *** {GET}->"api/poll/all-polls" ***
router.get("/all-polls", fetchUser, pollController.polls);

// ROUTE 2: DISPLAY ALL CREATED POLLS  *** {GET}->"api/poll/created-polls" ***
router.get("/created-polls", fetchUser, pollController.createdPolls);

// ROUTE 3: DISPLAY ALL PARTICIPATED POLLS  *** {GET}->"api/poll/participated-polls" ***
router.get("/participated-polls", fetchUser, pollController.participatedPolls);
module.exports = router;
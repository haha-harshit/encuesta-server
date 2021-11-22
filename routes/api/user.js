const express = require("express");
const passport = require("passport");
const router = express.Router();

const userController = require("../../controllers/api/user");

router.get("/get-user", userController.get_user);

module.exports = router;

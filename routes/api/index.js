const express = require("express");
const router = express.Router();

const passport = require("passport");

const homeController = require("../../controllers/api/index");

router.get("/", passport.checkAuthentication, homeController.home);

// export route
module.exports = router;

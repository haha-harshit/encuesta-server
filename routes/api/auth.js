const express = require("express");

// import router
const router = express.Router();

// make route for auth controller
const authController = require("../../controllers/api/auth");

// declaring route for auth to be acccessed
router.get("/", authController.auth);

module.exports = router;

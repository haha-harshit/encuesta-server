const express = require("express");
const router = express.Router();

const mainController = require("../controllers/index");

router.get("/", mainController.main);

module.exports = router;

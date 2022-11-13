const express = require("express");

const usersControllers = require("../controllers/userController");

const router = express.Router();

router.post("/register", usersControllers.register);

router.post("/login", usersControllers.login);

module.exports = router;

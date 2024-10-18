const express = require("express");
const {signup, login} = require("../controllers/authController");

const AuthRouter = express.Router();

AuthRouter.post('/signup', signup);
AuthRouter.post('/login', login);

module.exports = AuthRouter;
const express = require("express");
const UserRouter = express.Router();
const {login, signup} = require("../controllers/User")

UserRouter.get('/login', login)
UserRouter.post('/signup',signup)

module.exports = UserRouter
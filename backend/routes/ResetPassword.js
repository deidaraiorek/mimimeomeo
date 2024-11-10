const express = require("express");
const {sendResetLink, resetPassword} = require ('../controllers/resetpasswordController')

const ResetPasswordRouter = express.Router();

ResetPasswordRouter.post('/', sendResetLink)
ResetPasswordRouter.post('/setnewpw', resetPassword)

module.exports = ResetPasswordRouter;
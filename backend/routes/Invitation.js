const express = require("express");
const { sendInvitation, showInvitation, statusInvitation, breakCouple, checkCouple} = require("../controllers/invitationController");

const InviteRouter = express.Router();

InviteRouter.post('/send', sendInvitation);
InviteRouter.post('/response', statusInvitation);
InviteRouter.post('/breakup', breakCouple);
InviteRouter.get('/couplecheck/:userEmail', checkCouple);
InviteRouter.get('/show', showInvitation);

module.exports = InviteRouter;
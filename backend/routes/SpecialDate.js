const express = require("express");
const {addEvent, showEvent, deleteEvent} = require ("../controllers/specialdateController")

const SpecialDateRouter = express.Router();

SpecialDateRouter.post('/addevent', addEvent);
SpecialDateRouter.get('/:coupleId', showEvent);
SpecialDateRouter.delete('/:eventId', deleteEvent);

module.exports = SpecialDateRouter;
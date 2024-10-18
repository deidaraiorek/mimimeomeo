const express = require('express');
const { createNote, getNote, getCoupleNotes, updateNote, deleteNote } = require('../controllers/noteController');

const NoteRouter = express.Router();

// Define routes
NoteRouter.post('/', createNote);
NoteRouter.get('/:noteId', getNote);
NoteRouter.get('/couple/:coupleId', getCoupleNotes);
NoteRouter.put('/:noteId', updateNote);
NoteRouter.delete(':noteId', deleteNote);

module.exports = NoteRouter;
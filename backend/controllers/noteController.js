const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new note
const createNote = async (req, res) => {
    try {
        const { title, content, coupleId } = req.body;

        // Validate required fields
        if (!content || !coupleId) {
            return res.status(400).json({ error: 'Content and coupleId are required' });
        }

        // Check if couple exists
        const coupleExists = await prisma.couple.findUnique({
            where: { id: coupleId }
        });

        if (!coupleExists) {
            return res.status(404).json({ error: 'Couple not found' });
        }

        const note = await prisma.note.create({
            data: {
                title,
                content,
                coupleId
            }
        });

        res.status(201).json(note);
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ error: 'Failed to create note' });
    }
};

// Get a specific note
const getNote = async (req, res) => {
    try {
        const { noteId } = req.params;

        const note = await prisma.note.findUnique({
            where: { id: parseInt(noteId) }
        });

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.json(note);
    } catch (error) {
        console.error('Error retrieving note:', error);
        res.status(500).json({ error: 'Failed to retrieve note' });
    }
};

// Get all notes for a couple
const getCoupleNotes = async (req, res) => {
    try {
        const { coupleId } = req.params;

        const notes = await prisma.note.findMany({
            where: { coupleId: parseInt(coupleId) },
            orderBy: { createdAt: 'desc' }
        });

        res.json(notes);
    } catch (error) {
        console.error('Error retrieving couple notes:', error);
        res.status(500).json({ error: 'Failed to retrieve couple notes' });
    }
};

// Update a note
const updateNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const { title, content } = req.body;

        // Check if note exists
        const existingNote = await prisma.note.findUnique({
            where: { id: parseInt(noteId) }
        });

        if (!existingNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        const updatedNote = await prisma.note.update({
            where: { id: parseInt(noteId) },
            data: {
                title,
                content
            }
        });

        res.json(updatedNote);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ error: 'Failed to update note' });
    }
};

// Delete a note
const deleteNote = async (req, res) => {
    try {
        const { noteId } = req.params;

        // Check if note exists
        const existingNote = await prisma.note.findUnique({
            where: { id: parseInt(noteId) }
        });

        if (!existingNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        await prisma.note.delete({
            where: { id: parseInt(noteId) }
        });

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ error: 'Failed to delete note' });
    }
};

module.exports = {
    createNote,
    getNote,
    getCoupleNotes,
    updateNote,
    deleteNote
};
const express = require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addEvent = async (req, res) => {
    const { name, date, location, description, coupleId } = req.body;

    try {
        const newEvent = await prisma.event.create({
            data: {
                name,
                date,
                location,
                description,
                coupleId,
            },
        });

        return res.status(201).json(newEvent);
    } catch (error) {
        console.error("Error creating event:", error.message);
        return res.status(500).json({ error: "An error occurred while creating the event." });
    }
};

const showEvent = async (req, res) => {
    try {
        const { coupleId } = req.params;
        const events = await prisma.event.findMany({
            where: { coupleId: parseInt(coupleId) },
            orderBy: { date: 'asc' }
        });

        res.json(events);
    } catch (error) {
        console.error('Error retrieving couple events:', error);
        res.status(500).json({ error: 'Failed to retrieve couple events' });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.params;

        const existingEvent = await prisma.event.findUnique({
            where: { id: parseInt(eventId) }
        });

        if (!existingEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        await prisma.event.delete({
            where: { id: parseInt(eventId) }
        });

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Failed to delete event' });
    }
};


module.exports = {
    addEvent,
    showEvent,
    deleteEvent,
}
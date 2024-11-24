const express = require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const sendInvitation = async (req, res) => {
    const { senderEmail, receiverEmail } = req.body

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(receiverEmail)) {
        return res.status(400).json("Invalid email format");
    }

    const existSender = await prisma.invitation.findUnique({
        where: {
            senderEmail: senderEmail,
        },
    });

    //check if sender receive any invitation
    const existReceiver1 = await prisma.invitation.findUnique({
        where: {
            receiverEmail: senderEmail,
        },
    });

    const existReceiver = await prisma.invitation.findUnique({
        where: {
            receiverEmail: receiverEmail,
        },
    })

    //check if receiver sent any invitation
    const existSender1 = await prisma.invitation.findUnique({
        where: {
            senderEmail: receiverEmail,
        },
    });

    const existReceiverInCouple = await prisma.couple.findFirst({
        where: {
            users: {
                some: {
                    email: receiverEmail,
                },
            },
        },
    });

    const existUser = await prisma.user.findUnique({
        where: {
            email: receiverEmail,
        },
    })
    if (existSender) {
        return res.status(400).json("You sent an invitation before")
    } else if (existReceiver) {
        return res.status(400).json("This user is already in a couple or received an invitation")
    } else if (existReceiver1) {
        return res.status(400).json("You already have an invitation. Please respond to it before sending a new one.")
    }else if (existSender1) {
        return res.status(400).json("This user has sent an invitation to another user.")
    } else if (!existUser) {
        return res.status(400).json("This user doesn't exist")
    } else if (existReceiverInCouple) {
        return res.status(400).json("The receiver is already in a couple.");
    }

    const newInvitation = await prisma.invitation.create({
        data: {
            senderEmail,
            receiverEmail,
        }
    });


    res.status(201).json("Invitation sent successfully!")

    return;
}

const statusInvitation = async (req, res) => {
    const { invitation, status } = req.body;

    try {
        if (status === 'Accept') {
            const senderEmail = invitation.senderEmail;
            const receiverEmail = invitation.receiverEmail;

            const newCouple = await prisma.couple.create({
                data: {
                    users: {
                        connect: [
                            { email: senderEmail },
                            { email: receiverEmail },
                        ],
                    },
                },
                include: {
                    users: true, // Include the users data in the response
                },
            });

            return res.status(201).json(newCouple);
        } else {

            return res.status(200).json({ message: "Invitation declined" });
        }

    } catch (error) {
        console.error("Error handling invitation:", error);
        return res.status(500).json({ message: "Failed to handle invitation" });
    } finally {
        await prisma.invitation.delete({
            where: {
                id: invitation.id,
            },
        });
    }
};

const breakCouple = async (req, res) => {
    const { coupleId } = req.body

    await prisma.couple.delete({
        where: {
            id: coupleId,
        },
    });

    return res.status(200).json({ message: "Break up successfully" });
}

const checkCouple = async (req, res) => {
    const { userEmail } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail,
            },
            include: {
                couple: {
                    include: {
                        users: true,  // Include the users of the couple
                    },
                },
            },
        });
        if (user.couple) {
            return res.status(200).json(user.couple);
        }
        return res.status(200).json("");
    } catch (error) {
        console.error("Error fetching couple:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

const showInvitation = async (req, res) => {
    const { receiverEmail } = req.query
    const invitation = await prisma.invitation.findUnique({
        where: {
            receiverEmail: receiverEmail,
        },
    })
    if (invitation) {
        return res.status(200).json(invitation)
    } else {
        return res.status(200).json("")
    }
}

module.exports = {
    sendInvitation,
    statusInvitation,
    showInvitation,
    breakCouple,
    checkCouple,
}
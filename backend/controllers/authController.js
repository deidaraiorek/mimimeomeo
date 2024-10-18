const express = require("express");
const { PrismaClient } = require('@prisma/client');
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');


const signup = async (req, res) => {
    const {name, email, password} = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json("Invalid email format");
    }

    const existemail = await prisma.User.findUnique({
        where: {email}
    })
    if (existemail) {
        return res.status(400).json("Email already exists")
    }

    const hashpassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
        data: {
            email,
            name,
            password: hashpassword
        }
    });
    const token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Exclude sensitive information
    const { password: _, createdAt, updatedAt, ...userWithoutSensitiveInfo } = newUser;

    res.status(201).json({ user: userWithoutSensitiveInfo, token });
}

const login = async (req, res) => {
    const {email, password} = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json("Invalid email format");
    }

    const user = await prisma.user.findUnique({
        where: {email}
    })
    if (!user) {
        return res.status(400).json("Email doesn't exist")
    }

    const check = await bcrypt.compare(password, user.password)
    if (!check) {
        res.status(400).json("Incorrect Password")
    }

    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Exclude sensitive information
    const { password: _, createdAt, updatedAt, ...userWithoutSensitiveInfo } = user;

    res.status(200).json({ user: userWithoutSensitiveInfo, token });
};

module.exports ={
    login,
    signup
}
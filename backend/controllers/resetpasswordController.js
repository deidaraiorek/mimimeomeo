const express = require("express");
const { PrismaClient } = require('@prisma/client');
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendResetLink = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(404).json("User with this email does not exist");
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '15m',
        });

        await prisma.user.update({
            where: { email },
            data: { resetPasswordToken: token },
        });

        const resetLink = `${process.env.FRONTEND_URL}/forgotpassword/setnewpw?token=${token}`;

        // Send email with the reset link
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; text-align: center;">
    <h2 style="color: #333;">Hi, ${user.name}!</h2>
    <p style="color: #555;">There was a request to change your password!</p>
    <a href="${resetLink}" style="display: inline-block; margin: 20px auto; padding: 10px 20px; background-color: #FF69B4; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
      Change Password
    </a>
    <p style="color: #999; font-size: 14px;">If you did not make this request, just ignore this email. Otherwise, please click the button above to change your password.</p>
    <p style="color: #999; font-size: 14px; margin-top: 5px;">
      Do not share this link with anyone. It will expire in <strong>15 minutes</strong>.
    </p>
  </div>
    `,
        });

        res.status(200).json("Password reset link sent to your email.");
    } catch (error) {
        console.error(error);
        res.status(500).json("An error occurred while processing your request.");
    }
};

const resetPassword = async (req, res) => {
    const { token, password} = req.body;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });
  
      if (!user || user.resetPasswordToken !== token) {
        return res.status(400).json("Invalid or expired token");
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetPasswordToken: null, // Clear the token after successful reset
        },
      });
  
      res.status(200).json("Password reset successful");
    } catch (error) {
      console.error(error);
      res.status(400).json("Invalid or expired token");
    }
  };
  
module.exports = {
    sendResetLink,
    resetPassword,
}
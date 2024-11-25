const express = require('express');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors'); // Import cors
const NoteRouter = require('./routes/Notes');
const AuthRouter = require('./routes/Auth')
const InviteRouter = require ('./routes/Invitation')
const SpecialDateRouter = require ('./routes/SpecialDate')
const GalleryRouter = require('./routes/Gallery')
const ResetPasswordRouter = require('./routes/ResetPassword');
const { WebSocketServer } = require('ws');

dotenv.config();

const prisma = new PrismaClient();

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());

app.use('/notes', NoteRouter);
app.use('/auth', AuthRouter);
app.use('/invite', InviteRouter)
app.use('/specialdate', SpecialDateRouter)
app.use('/gallery', GalleryRouter)
app.use('/forgotpassword', ResetPasswordRouter)

app.get('/', (req, res) => {
  res.send('Hello, Prisma with Node.js and PostgreSQL!');
});

const PORT = process.env.PORT || 3000;
const server =  app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const wss = new WebSocketServer({ server });

// Map to store active WebSocket connections by userId
const activeUsers = new Map();

wss.on('connection', (ws) => {
  console.log('User connected to WebSocket');

  ws.on('message', async (message) => {
    const data = JSON.parse(message);

    // When a user connects, store their WebSocket in activeUsers
    if (data.action === 'CONNECT') {
      const { userId } = data;
      activeUsers.set(userId, ws);
      console.log(`User ${userId} connected and added to active users.`);
    }

    if (data.action === 'REQUEST_LOCATION') {
      console.log('Location request received');
      const { userId } = data;

      // Find the requesting user and their couple
      const requestingUser = await prisma.user.findUnique({
        where: { id: userId },
        include: { couple: { include: { users: true } } } // Include the couple and both users
      });

      if (!requestingUser || !requestingUser.couple) {
        ws.send(JSON.stringify({ error: 'User or couple not found' }));
        return;
      }

      // Find the partner in the couple
      const partner = requestingUser.couple.users.find(user => user.id !== userId);

      if (!partner) {
        ws.send(JSON.stringify({ error: 'Partner not found' }));
        return;
      }

      // Check if partner is active (has an active WebSocket connection)
      const partnerSocket = activeUsers.get(partner.id);

      if (partnerSocket) {
        // Request location from the partner
        partnerSocket.send(JSON.stringify({ action: 'GET_LOCATION', requesterId: userId }));
        console.log(`Location request sent to partner ${partner.id}`);
        // Set up a response listener to capture partner's location
        partnerSocket.on('message', (partnerMessage) => {
          const partnerData = JSON.parse(partnerMessage);
          if (partnerData.action === 'SEND_LOCATION') {
            // Send the location back to the requester
            ws.send(JSON.stringify({ location: partnerData.location }));
          }
        });
      } else {
        ws.send(JSON.stringify({ message: 'Partner is not active' }));
      }
    }

    if (data.action === 'SEND_LOCATION') {
      const { requesterId, location } = data;
      console.log(`Location received from user ${requesterId}: ${location}`);
      // Find the requester's WebSocket
      const requesterSocket = activeUsers.get(requesterId);
      if (requesterSocket) {
        // Send the location back to the requester
        requesterSocket.send(JSON.stringify({ location }));
      }
    }
  });

  ws.on('close', () => {
    // Clean up: Find and remove user from activeUsers map on disconnect
    for (const [userId, socket] of activeUsers) {
      if (socket === ws) {
        activeUsers.delete(userId);
        console.log(`User ${userId} disconnected and removed from active users.`);
        break;
      }
    }
  });
});
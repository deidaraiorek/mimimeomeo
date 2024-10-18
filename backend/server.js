const express = require('express');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors'); // Import cors
const NoteRouter = require('./routes/Notes');
const AuthRouter = require('./routes/Auth')

dotenv.config();

const prisma = new PrismaClient();

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());

app.use('/notes', NoteRouter);
app.use('/auth', AuthRouter);

app.get('/', (req, res) => {
  res.send('Hello, Prisma with Node.js and PostgreSQL!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

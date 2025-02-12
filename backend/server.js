const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const http = require('http');  // Import the HTTP module
const socketIo = require('socket.io');  // Import Socket.io
require('dotenv').config();

// Import your Chat model
const Chat = require('./models/services/chat/Chat');

// Main route
const routingPath = require('./routes/routes');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Serve static files from /assets
app.use('/assets', express.static(path.join(__dirname, 'assets'))); 

// Routes
app.use('/api', routingPath);

// Create an HTTP server with the Express app
const server = http.createServer(app);

// Initialize Socket.io with the HTTP server
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Update this if the frontend URL is different
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
    console.log('New client connected');

    // Listen for joinChat event to add the user to a specific chat room
    socket.on('joinChat', (chatId) => {
        socket.join(chatId);
        console.log(`User joined chat: ${chatId}`);
    });

    // Listen for sendMessage event and save the message to the database
    socket.on('sendMessage', async ({ chatId, senderId, content }) => {
        try {
            const chat = await Chat.findById(chatId);
            if (chat) {
                const message = { sender: senderId, content };
                chat.messages.push(message);
                chat.lastMessage = content;
                chat.lastMessageTime = Date.now();
                await chat.save();
                io.to(chatId).emit('receiveMessage', message); // Emit the message to all users in the chat room
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database connection established');
    server.listen(process.env.PORT, () => {
      console.log(`Backend listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

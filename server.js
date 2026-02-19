const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/'))); // serve your static files

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/order-glam-db';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Schemas
const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isMember: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const orderSchema = new mongoose.Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    dateTime: { type: Date, required: true },
    orderType: String,
    appointmentType: String,
    items: [String],
    services: [String],
    status: { type: String, default: 'pending' },
    userId: { type: String, required: true },
    placedAt: { type: Date, default: Date.now }
});

const noteSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    content: { type: String, default: '' },
    updatedAt: { type: Date, default: Date.now }
});

const announcementSchema = new mongoose.Schema({
    from: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

// Models
const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);
const Note = mongoose.model('Note', noteSchema);
const Announcement = mongoose.model('Announcement', announcementSchema);

// ========== AUTH ROUTES ==========
app.post('/api/auth/login', async (req, res) => {
    try {
        const { userId, password } = req.body;
        const user = await User.findOne({ userId });
        if (!user) return res.status(401).json({ error
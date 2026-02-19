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

// Serve static files (like index.html, app.js, CSS)
app.use(express.static(__dirname));

// ========== MONGODB CONNECTION ==========
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/order-glam-db';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// ========== SCHEMAS ==========
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

// ========== MODELS ==========
const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);
const Note = mongoose.model('Note', noteSchema);
const Announcement = mongoose.model('Announcement', announcementSchema);

// ========== ROOT ROUTE ==========
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ========== AUTH ROUTES ==========

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { userId, password } = req.body;
        const user = await User.findOne({ userId });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

        res.json({ userId: user.userId, isMember: user.isMember });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Sign Up
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { userId, password, isMember = false } = req.body;

        if (userId.length <= 4 || !/[a-zA-Z]/.test(userId)) {
            return res.status(400).json({
                error: 'Uh oh! Please enter more than four digits and at least 1 letter'
            });
        }

        const existingUser = await User.findOne({ userId });
        if (existingUser) return res.status(409).json({ error: 'User ID already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userId,
            password: hashedPassword,
            isMember
        });

        await newUser.save();
        res.json({ userId: newUser.userId, isMember: newUser.isMember });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ========== NOTES ROUTES ==========

// Get Notes
app.get('/api/notes/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        let note = await Note.findOne({ userId });
        if (!note) {
            note = new Note({ userId, content: '' });
            await note.save();
        }
        res.json({ notes: note.content });
    } catch (error) {
        console.error('Get notes error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Save Notes
app.post('/api/notes/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { notes } = req.body;

        let note = await Note.findOne({ userId });
        if (!note) note = new Note({ userId });

        note.content = notes;
        note.updatedAt = new Date();
        await note.save();

        res.json({ success: true });
    } catch (error) {
        console.error('Save notes error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ========== ORDERS ROUTES ==========

// Get All Orders
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ placedAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create Order
app.post('/api/orders', async (req, res) => {
    try {
        const orderData = req.body;
        const newOrder = new Order(orderData);
        await newOrder.save();

        res.json(newOrder);
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update Order Status
app.patch('/api/orders/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) return res.status(404).json({ error: 'Order not found' });

        res.json(order);
    } catch (error) {
        console.error('Update order error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ========== ANNOUNCEMENTS ROUTES ==========

// Get All Announcements
app.get('/api/announcements', async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ timestamp: -1 });
        res.json(announcements);
    } catch (error) {
        console.error('Get announcements error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create Announcement
app.post('/api/announcements', async (req, res) => {
    try {
        const { from, message } = req.body;
        const newAnnouncement = new Announcement({ from, message });
        await newAnnouncement.save();
        res.json(newAnnouncement);
    } catch (error) {
        console.error('Create announcement error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
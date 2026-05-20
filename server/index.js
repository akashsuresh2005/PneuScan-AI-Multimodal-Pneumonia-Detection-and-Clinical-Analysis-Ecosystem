const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import Routes and Models
const predictionRoutes = require('./routes/predictionRoutes');
const authRoutes = require('./routes/authRoutes');
const Patient = require('./models/Patient'); 

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// Serve the uploads folder statically
// This serves both original X-rays and AI-generated Heatmaps
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Routes ---

// 1. Authentication Routes (Handles Doctor & Patient logins)
app.use('/api/auth', authRoutes);

// 2. Prediction Routes (Handles Image Upload -> AI Engine -> MongoDB Save)
app.use('/api', predictionRoutes);

// 3. Global History Route (For Doctors/Admin)
app.get('/api/history', async (req, res) => {
    try {
        // Returns every single scan in the database, newest first
        const records = await Patient.find().sort({ analyzedAt: -1 });
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch global history" });
    }
});

// 4. Patient-Specific Route (For the Patient Portal)
// This is used by the Patient login to see ONLY their records
app.get('/api/my-reports/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params;
        const records = await Patient.find({ patientId: patientId }).sort({ analyzedAt: -1 });
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch patient-specific records" });
    }
});

// 5. Health Check Route
app.get('/', (req, res) => {
    res.send("PneuScan AI Backend (Dual-Mode) is online.");
});

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err.message);
        process.exit(1); 
    });

// --- Server Startup ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 PneuScan AI Server running on http://localhost:${PORT}`);
    console.log(`📂 Medical Assets serving from: ${path.join(__dirname, 'uploads')}`);
});
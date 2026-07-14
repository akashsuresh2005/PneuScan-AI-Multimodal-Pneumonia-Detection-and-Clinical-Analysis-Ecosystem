const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const Patient = require('../models/Patient');

const upload = multer({ dest: 'uploads/' });

/**
 * @route   POST /api/predict
 * @desc    Receive X-ray & Vitals, validate inputs, forward to AI Engine, and persist results
 */
router.post('/predict', upload.single('xray'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No image file uploaded." });

        // --- GUARDRAIL 3: GATEWAY BIOLOGICAL BOUNDS TESTING ---
        const age = Number(req.body.age);
        const spo2 = Number(req.body.spo2);

        if (isNaN(age) || age < 0 || age > 120) {
            if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: "Validation Fault: Patient age must be a valid number between 0 and 120." });
        }

        if (isNaN(spo2) || spo2 < 50 || spo2 > 100) {
            if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: "Validation Fault: Oxygen saturation (SpO2) must reflect a biological range between 50% and 100%." });
        }

        if (req.file.size === 0) {
            if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: "Validation Fault: Uploaded image file is empty (0 bytes)." });
        }

        // 1. Pack Multipart Form-Data for the Python AI Engine
        const formData = new FormData();
        formData.append('file', fs.createReadStream(req.file.path), {
            filename: req.file.originalname || 'scan.jpg',
            contentType: req.file.mimetype || 'image/jpeg'
        });

        // 2. Append verified vital parameters
        formData.append('age', age);
        formData.append('gender', req.body.gender || "Not Specified");
        formData.append('fever', req.body.fever || "No");
        formData.append('spo2', spo2);

        const AI_URL = process.env.AI_ENGINE_URL || 'http://127.0.0.1:8000/predict';

        console.log("AI_URL =", AI_URL);

        // 3. Dispatch payload to FastAPI Engine
        const response = await axios.post(AI_URL, formData, {
            headers: { ...formData.getHeaders() },
            timeout: 120000 // 2 minutes, to accommodate Render cold starts
        });

        const { 
            prediction, 
            confidence, 
            heatmapPath, 
            heatmapImageBase64,
            findings, 
            severity, 
            severityLevel, 
            localization, 
            error 
        } = response.data;

        if (error) return res.status(500).json({ error: "AI Engine Error", details: error });

        // 3.5 Save the heatmap image (received as base64 from the AI Engine) into Node's own uploads folder
        if (heatmapImageBase64 && heatmapPath) {
            const uploadsDir = path.join(__dirname, '..', 'uploads');
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
            }
            const heatmapBuffer = Buffer.from(heatmapImageBase64, 'base64');
            fs.writeFileSync(path.join(uploadsDir, heatmapPath), heatmapBuffer);
        }

        // 4. Save comprehensive clinical documentation to MongoDB Atlas
        const record = await Patient.create({
            patientName: req.body.patientName || "Anonymous Patient",
            patientId: req.body.patientId || "N/A",
            age: age,
            gender: req.body.gender || "Not Specified",
            filename: req.file.filename,
            prediction: prediction, 
            confidence: Number(confidence),
            severity: severity || "N/A",            
            severityLevel: Number(severityLevel) || 0,       
            localization: localization || "N/A",     
            heatmapPath: heatmapPath,
            aiFindings: findings || []
        });

        // 5. Clean local server file cache safely
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        
        res.status(201).json(record);
    } catch (error) {
        console.error("========== AI ERROR ==========");
        console.error(error.message);

        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        }

        if (error.request) {
            console.error("No response received from AI engine");
        }

        console.error(error.stack);

        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        // Handle explicit FastAPI errors smoothly
        if (error.response?.data?.detail) {
            return res.status(error.response.status).json({
                error: error.response.data.detail
            });
        }

        res.status(500).json({
            error: "AI Engine Unreachable or Internal Pipeline Failure"
        });
    }
});

/**
 * @route   GET /api/history
 * @desc    Fetch comprehensive diagnostic history sorted by newest first
 */
router.get('/history', async (req, res) => {
    try {
        const history = await Patient.find().sort({ analyzedAt: -1 });
        res.json(history);
    } catch (e) { 
        res.status(500).json({ error: "Fetch failed" }); 
    }
});

/**
 * @route   DELETE /api/:id
 * @desc    Permanently delete a specific patient clinical record
 */
router.delete('/:id', async (req, res) => {
    try {
        const result = await Patient.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ error: "Record not found" });
        res.json({ message: "Record deleted successfully" });
    } catch (e) {
        res.status(500).json({ error: "Server error during deletion" });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Role-Based Mock Users
const DOCTOR_CREDENTIALS = { email: "admin@bit.edu", password: "password123" };

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // 1. Check for Doctor (Admin)
    if (email === DOCTOR_CREDENTIALS.email && password === DOCTOR_CREDENTIALS.password) {
        const token = jwt.sign({ email, role: 'doctor' }, 'SECRET_KEY_BIT', { expiresIn: '1h' });
        return res.json({ 
            success: true, 
            token, 
            user: { email, role: 'doctor' } 
        });
    }

    // 2. Check for Patient Login
    // Logic: Email is patient's email, Password is their Mobile Number (PatientId)
    // In a real app, you would verify this against MongoDB
    if (password.length >= 10 && email.includes('@')) {
        const token = jwt.sign({ email, role: 'patient', patientId: password }, 'SECRET_KEY_BIT', { expiresIn: '1h' });
        return res.json({ 
            success: true, 
            token, 
            user: { 
                email, 
                role: 'patient', 
                patientId: password // Mobile number acts as the ID
            } 
        });
    }
    
    res.status(401).json({ message: "Invalid Medical Credentials" });
});

module.exports = router;
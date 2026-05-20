const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    patientName: { 
        type: String, 
        required: true 
    },
    patientId: { 
        type: String, 
        required: true 
    }, 
    age: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        default: "Not Specified"
    },
    filename: {
        type: String
    },
    prediction: { 
        type: String,
        required: true
        // Dynamically stores: 'NORMAL', 'BACTERIAL PNEUMONIA', 'VIRAL PNEUMONIA', 'COVID-19 POSITIVE'
    },
    confidence: { 
        type: Number,
        required: true
    },
    severity: { 
        type: String, 
        default: "N/A" 
    },
    severityLevel: { 
        type: Number, 
        default: 0 
    },
    localization: { 
        type: String, 
        default: "N/A" 
    },
    heatmapPath: {
        type: String
    }, 
    aiFindings: {
        type: [String],
        default: []
    },
    analyzedAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Patient', PatientSchema);
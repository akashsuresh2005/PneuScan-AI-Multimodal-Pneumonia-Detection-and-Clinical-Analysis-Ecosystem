import jsPDF from 'jspdf';

export const generatePDFReport = (data) => {
    const doc = new jsPDF();

    // Blue Header Bar
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 40, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("RADIOLOGY DIAGNOSTIC REPORT", 20, 25);

    // Body Text
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Report ID: ${data._id}`, 20, 50);
    doc.text(`Date of Analysis: ${new Date(data.analyzedAt).toLocaleString()}`, 20, 60);
    doc.text(`Institution: Bangalore Institute of Technology`, 20, 70);
    
    doc.setLineWidth(0.5);
    doc.line(20, 75, 190, 75);

    // Results Section
    doc.setFontSize(16);
    doc.text("AI FINDINGS:", 20, 90);
    
    if (data.prediction === "PNEUMONIA") {
        doc.setTextColor(220, 38, 38); // Red
    } else {
        doc.setTextColor(22, 163, 74); // Green
    }
    
    doc.setFontSize(24);
    doc.text(data.prediction, 20, 105);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text(`Confidence Level: ${data.confidence}%`, 20, 120);

    // Disclaimer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("DISCLAIMER: This is an AI-generated report for educational purposes.", 20, 280);

    doc.save(`Report_${data._id}.pdf`);
};
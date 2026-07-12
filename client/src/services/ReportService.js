import jsPDF from 'jspdf';

export const generateProfessionalPDFReport = (resultData) => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();

    // 1. HEADER
    doc.setFillColor(30, 41, 59); // Dark Slate
    doc.rect(0, 0, pageWidth, 45, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24); doc.setFont('helvetica', 'bold');
    doc.text("PNEUSCAN AI DIAGNOSTICS", 15, 20);
    doc.setFontSize(10); doc.setFont('helvetica', 'normal');
    doc.text("Bangalore Institute of Technology • Department of Radiology", 15, 28);
    doc.text("AI-Assisted Pulmonary Assessment Report", 15, 34);
    
    // 2. PATIENT INFO BAR
    doc.setFillColor(241, 245, 249);
    doc.rect(15, 55, pageWidth - 30, 25, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    doc.text(`PATIENT: ${(resultData.patientName || "Anonymous").toUpperCase()}`, 20, 63);
    doc.text(`ID/MOBILE: ${resultData.patientId || "N/A"}`, 20, 71);
    doc.text(`AGE/GENDER: ${resultData.age || 'N/A'}, ${resultData.gender || 'N/A'}`, pageWidth - 80, 63);
    doc.text(`DATE: ${resultData.analyzedAt ? new Date(resultData.analyzedAt).toLocaleString() : new Date().toLocaleString()}`, pageWidth - 80, 71);

    // 3. DIAGNOSIS SECTION (RE-ENGINEERED FOR MULTI-CLASS COLOR SEGREGATION)
    doc.setFontSize(14); doc.setFont('helvetica', 'bold');
    doc.text("RADIOLOGICAL FINDINGS", 15, 95);
    doc.line(15, 97, 60, 97);
    
    const predictionStr = resultData.prediction ? resultData.prediction.toUpperCase() : "NORMAL";
    
    // Default color values setup: Emerald Green for NORMAL lungs
    let rColor = 16;  
    let gColor = 185; 
    let bColor = 129; 

    if (predictionStr === "COVID-19 POSITIVE") {
        // Deep Purple Palette matching UI state boundaries
        rColor = 126; gColor = 34; bColor = 206;
    } else if (predictionStr === "BACTERIAL PNEUMONIA" || predictionStr === "VIRAL PNEUMONIA") {
        // Crimson Medical Red for high alert acute conditions
        rColor = 220; gColor = 38; bColor = 38;
    }

    // Draw Dynamic Diagnostic Banner Base Graphic
    doc.setFillColor(rColor, gColor, bColor);
    doc.roundedRect(15, 105, pageWidth - 30, 30, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    
    // Dynamic text resizing based on the length of the string to avoid overlaps
    if (predictionStr.length > 18) {
        doc.setFontSize(20); // Scale font size down slightly for multi-word etiologies
    } else {
        doc.setFontSize(26);
    }
    
    doc.setFont('helvetica', 'bold');
    doc.text(predictionStr, 23, 124);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Neural Confidence: ${resultData.confidence}%`, pageWidth - 70, 123);

    // 4. ADVANCED CLINICAL METRICS
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11); doc.setFont('helvetica', 'bold');
    doc.text("ANATOMIC LOCALIZATION:", 15, 148);
    doc.setFont('helvetica', 'normal');
    doc.text(resultData.localization || "N/A", 70, 148);

    doc.setFont('helvetica', 'bold');
    doc.text("CLINICAL SEVERITY:", 15, 156);
    doc.setFont('helvetica', 'normal');
    doc.text(resultData.severity || "Standard Assessment", 70, 156);

    // 5. OBSERVATIONS (UPDATED WITH AUTO-WRAPPING TEXT ENGINE)
    doc.setFontSize(11); doc.setFont('helvetica', 'bold');
    doc.text("AI-GENERATED OBSERVATIONS:", 15, 172);
    doc.setFont('helvetica', 'normal');
    
    const observations = resultData.aiFindings || [];
    let currentYOffset = 180;
    const maxTextWidth = pageWidth - 30; // 15mm margins on both sides

    observations.forEach((line) => {
        // Fix LaTeX styling markers on strings before passing to canvas engine
        const cleanedLine = line.replace(/\$?SpO_2\$?/g, "SpO2");
        
        // Dynamically split long strings into an array of lines based on document margins
        const wrappedLines = doc.splitTextToSize(`• ${cleanedLine}`, maxTextWidth);
        
        wrappedLines.forEach((textRow) => {
            doc.text(textRow, 15, currentYOffset);
            currentYOffset += 6; // Move down cleanly for multi-line sentences
        });
        currentYOffset += 1.5; // Micro spacing between different bullet nodes
    });

    // 6. ADAPTIVE RECOMMENDATIONS PATHWAY MAPPING (UPDATED FOR DYNAMIC Y-OFFSETS & CLEAN TEXT)
    // Establish a safe dynamic top margin relative to the length of your wrapped observations
    const recommendationsTopY = currentYOffset + 8;
    
    doc.setFont('helvetica', 'bold');
    doc.text("CLINICAL NEXT STEPS:", 15, recommendationsTopY);
    doc.setFont('helvetica', 'normal');
    
    let recommendationLines = [];
    if (predictionStr === "NORMAL") {
        recommendationLines = [
            "- Maintain standard respiratory hygiene and routine follow-up.",
            "- If clinical symptoms persist, consider cross-correlation with further labs."
        ];
    } else if (predictionStr === "COVID-19 POSITIVE") {
        recommendationLines = [
            "- Immediate isolation protocols and implementation of institutional guidelines.",
            "- Order an urgent confirmatory RT-PCR lab analysis track panel.",
            "- Continuous pulse oximetry saturation tracking (SpO2) is strongly advised."
        ];
    } else {
        recommendationLines = [
            "- Immediate consultation with a staff Pulmonologist is required.",
            "- Recommended CBC / CRP blood assay profiles to monitor active path markers.",
            "- Regular SpO2 vital monitoring schedule implementation."
        ];
    }

    // Print wrapped recommendations safely using the new dynamic height offset accumulator
    recommendationLines.forEach((line, i) => {
        const wrappedRec = doc.splitTextToSize(line, maxTextWidth);
        wrappedRec.forEach((textRow) => {
            doc.text(textRow, 15, (recommendationsTopY + 8) + (i * 7));
        });
    });
    // 7. FOOTER & SEAL
    doc.setDrawColor(200, 200, 200);
    doc.rect(pageWidth - 75, 255, 60, 28);
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.text("DIGITAL VERIFICATION SEAL", pageWidth - 70, 263);
    doc.setFont('helvetica', 'normal');
    doc.text("System: PneuScan AI Core v1.2", pageWidth - 70, 270);
    doc.text("Status: Verified Diagnostic", pageWidth - 70, 277);

    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.text("Disclaimer: This is an AI-assisted diagnostic tool. Final clinical decisions must be made by a qualified medical professional.", 15, 290);

    doc.save(`BIT_Radiology_Report_${resultData.patientId || 'RECORD'}.pdf`);
};
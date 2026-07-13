
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Download, Stethoscope } from 'lucide-react';
import { generateProfessionalPDFReport } from '../services/ReportService';

const PatientPortal = ({ patientId }) => {
  const [myRecords, setMyRecords] = useState([]);

  useEffect(() => {
    axios.get(`https://pneuscan-ai-multimodal-pneumonia-jhqi.onrender.com/api/my-reports/${patientId}`)
      .then(res => setMyRecords(res.data))
      .catch(err => console.error("Access denied to requested medical indices", err));
  }, [patientId]);

  return (
    <div className="max-w-6xl mx-auto p-8 font-sans antialiased bg-slate-50/30 min-h-screen">
      {/* Title Segment with Amplified Size */}
      <h2 className="text-4xl font-black mb-10 tracking-tight text-slate-900">
        My Medical <span className="text-blue-600">Records</span>
      </h2>
      
      {myRecords.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-[32px] p-16 text-center max-w-2xl mx-auto mt-12 shadow-xl">
          <div className="bg-slate-50 p-5 rounded-full w-16 h-16 flex items-center justify-center text-slate-400 mx-auto mb-6">
            <Stethoscope size={28} />
          </div>
          <h4 className="text-xl font-black text-slate-800 uppercase tracking-wider font-mono">No Diagnostics Logged</h4>
          <p className="text-base text-slate-400 font-medium mt-2">There are currently no multi-modal radiograph scans linked to your profile parameters.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-10">
          {myRecords.map((report) => (
            <div key={report._id} className="bg-white rounded-[32px] p-8 shadow-xl border border-slate-100 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl">
              
              <div>
                {/* Visual Imaging Section: Bold Layout Alignment */}
                <div className="flex items-center gap-6 mb-8">
                  
                  {/* ENLARGED CORE CONTAINER: AI NEURAL ATTENTION HEATMAP */}
                  <div className="w-28 h-28 rounded-2xl overflow-hidden border border-slate-200 bg-[#0c1017] shrink-0 flex items-center justify-center shadow-md">
                    <img 
                      src={`https://pneuscan-ai-multimodal-pneumonia-jhqi.onrender.com/uploads/${report.heatmapPath}`} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                      alt="Neural Attention Heatmap Matrix" 
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=200&q=80";
                      }}
                    />
                  </div>

                  {/* Diagnostic Information Alignment Pane with Enhanced Text Sizing */}
                  <div className="flex-1 min-w-0 space-y-3">
                    <div>
                      <span className={`text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full ${
                        report.prediction === 'NORMAL' 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                          : report.prediction === 'COVID-19 POSITIVE'
                          ? 'bg-purple-50 text-purple-600 border border-purple-200'
                          : 'bg-rose-50 text-rose-600 border border-rose-200'
                      }`}>
                        {report.prediction}
                      </span>
                    </div>
                    <p className="text-slate-500 font-mono text-sm font-bold uppercase tracking-wider pt-1">
                      Analyzed: {report.analyzedAt ? new Date(report.analyzedAt).toLocaleDateString() : '20/5/2026'}
                    </p>
                  </div>
                </div>
                
                {/* AI Findings Matrix: Deep-Read Layout Optimization */}
                <div className="space-y-4 bg-slate-50/80 p-6 rounded-2xl mb-8 border border-slate-100">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono">
                    AI-Generated Observations Matrix:
                  </p>
                  <div className="space-y-3">
                    {(report.aiFindings || []).map((finding, i) => (
                      <p key={i} className="text-[15px] text-slate-800 font-semibold leading-relaxed tracking-tight">
                        • {finding.replace(/\$?SpO_2\$?/g, "SpO2")}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* High-Readability Action Extract Button */}
              <button 
                onClick={() => generateProfessionalPDFReport(report)}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest active:scale-[0.99] transition-all shadow-lg"
              >
                DOWNLOAD CLINICAL ASSESSMENT REPORT
              </button>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientPortal;

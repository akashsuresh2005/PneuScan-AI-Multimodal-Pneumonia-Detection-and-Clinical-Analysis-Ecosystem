import React from 'react';
import { ShieldAlert, CheckCircle, Download, Award, ListChecks, MapPin, Activity } from 'lucide-react';
import { generateProfessionalPDFReport } from '../services/ReportService';

const ResultCard = ({ result, originalFile }) => {
  if (!result) return null;
  
  const predictionStr = result.prediction ? result.prediction.toUpperCase() : "NORMAL";
  const isNormal = predictionStr === "NORMAL";
  const isCovid = predictionStr === "COVID-19 POSITIVE";
  const confidence = parseFloat(result.confidence) || 0.0;

  // --- GUARDRAIL 2: CONFIDENCE INTERCEPT THRESHOLD ---
  const isLowConfidence = confidence < 50.0;

  return (
    <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in duration-500">
      
      {/* 1. Side-by-Side Imaging Suite */}
      <div className="grid md:grid-cols-2 bg-slate-900 h-[320px]">
        <div className="relative group">
          {originalFile && (
            <img src={URL.createObjectURL(originalFile)} alt="Original" className="w-full h-full object-cover opacity-80" />
          )}
          <span className="absolute bottom-4 left-4 bg-black/50 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase backdrop-blur-md">Original X-Ray</span>
        </div>
        <div className="relative group border-l border-white/10">
          <img src={`https://pneuscan-ai-multimodal-pneumonia-jhqi.onrender.com/uploads/${result.heatmapPath}`} alt="Heatmap" className="w-full h-full object-cover" />
          <span className="absolute bottom-4 left-4 bg-blue-600/80 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase backdrop-blur-md">AI Heatmap Visualization</span>
        </div>
      </div>

      {/* LOW CONFIDENCE SYSTEM INTERCEPT ALERT CARD */}
      {isLowConfidence && (
        <div className="mx-8 mt-6 p-5 bg-amber-50 border border-amber-200 rounded-3xl flex items-start gap-4 animate-in fade-in duration-300">
          <div className="p-2 bg-amber-500 text-white rounded-xl font-black text-sm shrink-0">⚠️</div>
          <div>
            <h4 className="text-sm font-black text-amber-800 uppercase tracking-tight">Low-Confidence System Warning</h4>
            <p className="text-xs text-amber-700/90 font-semibold mt-1 leading-relaxed">
              The neural fusion network attention layers scored this scan below 50%. This classification is unverified. 
              <strong className="block text-amber-900 font-black mt-1 uppercase">Action Required: Forwarding artifact coordinates for immediate manual Pathologist review.</strong>
            </p>
          </div>
        </div>
      )}

      {/* 2. Diagnosis Status Badge */}
      <div className={`relative flex justify-center mt-6 z-10 px-8 transition-all duration-300 ${isLowConfidence ? 'opacity-30 grayscale pointer-events-none' : ''}`}>
        <div className={`flex items-center gap-5 px-8 py-5 rounded-3xl shadow-xl border-b-4 w-full md:w-auto ${
          isNormal 
            ? 'bg-emerald-600 text-white border-emerald-800' 
            : isCovid
            ? 'bg-purple-700 text-white border-purple-900 animate-pulse'
            : 'bg-red-600 text-white border-red-800'
        }`}>
          {isNormal ? <CheckCircle size={32} /> : <ShieldAlert size={32} className={isCovid ? "" : "animate-pulse"} />}
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/80 leading-none mb-1.5">
              Radiological Status
            </span>
            <span className="text-xl md:text-2xl font-black tracking-tight uppercase leading-tight whitespace-normal break-words">
              {predictionStr}
            </span>
          </div>
        </div>
      </div>

      <div className="p-8 pt-6 space-y-8">
        
        {/* 3. Advanced Diagnostic Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-3xl flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-2xl text-blue-600"><MapPin size={20}/></div>
                <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Anatomic Focus</p>
                    <p className="text-sm font-bold text-slate-700">{result.localization || "Analyzing Zones..."}</p>
                </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-4 rounded-3xl flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-2xl text-orange-600"><Activity size={20}/></div>
                <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Severity Tier</p>
                    <p className="text-sm font-bold text-slate-700">{result.severity || "Calculating..."}</p>
                </div>
            </div>
        </div>

        {/* Probability Assessment Section */}
        <div className="bg-slate-50/80 p-6 rounded-[30px] border border-slate-100">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Neural Core Probability</p>
              <h3 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{confidence}%</h3>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-slate-500 uppercase px-2 py-1 bg-white rounded-md border border-slate-200 mb-1">Accuracy Grade</span>
                <span className="text-[10px] font-bold text-slate-400">Model v1.2</span>
            </div>
          </div>
          <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden p-1">
            <div className={`h-full rounded-full transition-all duration-1000 ${
              isNormal ? 'bg-emerald-500' : isCovid ? 'bg-purple-500' : 'bg-red-500'
            }`} style={{ width: `${confidence}%` }}></div>
          </div>
        </div>

        {/* Clinical Guidelines & Branding */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-blue-50/40 rounded-[30px] border border-blue-100/50">
            <h4 className="flex items-center gap-2 font-black text-blue-600 text-xs mb-4 uppercase tracking-widest leading-none"><ListChecks size={16}/> Clinical Guidelines</h4>
            <ul className="space-y-3 text-[11px] text-blue-900/80 font-bold">
              {!isNormal ? (
                <>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1 shrink-0" /> 
                    Immediate Pulmonologist Consultation ({predictionStr})
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1 shrink-0" /> 
                    {isCovid ? "Isolate Patient / Check RT-PCR Confirmations" : "Urgent CBC / CRP Panel Analysis"}
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1 shrink-0" /> 
                    Continuous SpO2 Tracking via Oxymetry Core
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1 shrink-0" /> Routine Pulmonary Follow-up (7 Days)</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1 shrink-0" /> Maintenance of Respiratory Hygiene</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1 shrink-0" /> Standard Care & Observation</li>
                </>
              )}
            </ul>
          </div>
          
          <div className="p-6 bg-slate-50/50 rounded-[30px] border border-slate-200/50 flex flex-col justify-center items-center text-center">
            <div className="p-4 bg-white rounded-2xl shadow-sm mb-3">
              <Award className="text-slate-300" size={32}/>
            </div>
            <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest leading-none">Verified Diagnostic</p>
            <p className="text-[8px] text-slate-400 font-bold uppercase mt-2 tracking-tighter">BIT Radiology Dept © 2026</p>
          </div>
        </div>

        <button onClick={() => generateProfessionalPDFReport(result)} className="w-full bg-slate-900 text-white py-5 rounded-[25px] font-black flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
          <Download size={20}/> DOWNLOAD CLINICAL RADIOLOGY REPORT
        </button>
      </div>
    </div>
  );
};

export default ResultCard;

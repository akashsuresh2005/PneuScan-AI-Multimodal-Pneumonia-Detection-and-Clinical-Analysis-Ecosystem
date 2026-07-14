





// import React, { useState } from 'react';
// import axios from 'axios';
// import { UserCircle, Activity, ShieldCheck, Microscope, Cpu, Zap, Wind, Waves, Upload, FileImage } from 'lucide-react';
// import UploadZone from '../components/UploadZone';
// import ResultCard from '../components/ResultCard';

// const FontLoader = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@500;700&display=swap');
//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//     :root {
//       --white:       #ffffff;
//       --ink-50:      #f4f6fa;
//       --ink-100:     #eaecf4;
//       --ink-200:     #d5d9e8;
//       --ink-300:     #b0b8cc;
//       --ink-400:     #7a8499;
//       --ink-500:     #5a6378;
//       --ink-600:     #3d4458;
//       --ink-900:     #0d1117;
//       --blue-400:    #60a5fa;
//       --blue-500:    #3b82f6;
//       --blue-600:    #2563eb;
//       --emerald-400: #34d399;
//       --emerald-500: #10b981;
//       --rose-500:    #f43f5e;
//       --amber-400:   #fbbf24;
//       --void:        #04080f;
//       --border-dark: rgba(255,255,255,0.07);
//     }

//     html, body, #root { height: 100%; font-family: 'DM Sans', sans-serif; margin: 0; padding: 0; background: var(--ink-50); }



//     /* ── PAGE SHELL ── */
//     .dash-shell { max-width: 1360px; margin: 0 auto; padding: 20px 28px 36px; }

//     /* ── PAGE HEADER ── */
//     .page-header {
//       display: flex; align-items: flex-start; justify-content: space-between;
//       margin-bottom: 18px; padding-bottom: 18px;
//       border-bottom: 1px solid var(--ink-100);
//     }
//     .page-title {
//       font-family: 'Syne', sans-serif; font-size: 34px; font-weight: 800;
//       color: var(--ink-900); letter-spacing: -0.03em; line-height: 1;
//     }
//     .page-title span { color: var(--blue-600); }
//     .page-subtitle {
//       font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700;
//       color: var(--ink-400); text-transform: uppercase; letter-spacing: 0.12em; margin-top: 6px;
//     }
//     .header-badge {
//       display: flex; align-items: center; gap: 7px;
//       padding: 8px 14px; border-radius: 10px;
//       background: rgba(37,99,235,0.05); border: 1px solid rgba(37,99,235,0.12);
//       font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700;
//       color: var(--blue-600); text-transform: uppercase; letter-spacing: 0.1em;
//     }

//     /* ── METRICS STRIP ── */
//     .metrics-strip {
//       display: flex; gap: 10px; margin-bottom: 18px; flex-wrap: wrap;
//     }
//     .metric-card {
//       flex: 1; min-width: 130px;
//       background: var(--white); border: 1px solid var(--ink-100);
//       border-radius: 14px; padding: 14px 16px;
//       display: flex; align-items: center; gap: 12px;
//     }
//     .metric-card-icon {
//       width: 34px; height: 34px; border-radius: 9px;
//       display: flex; align-items: center; justify-content: center; flex-shrink: 0;
//     }
//     .metric-card-icon.blue    { background: rgba(37,99,235,0.08);  color: var(--blue-600); }
//     .metric-card-icon.emerald { background: rgba(16,185,129,0.08); color: var(--emerald-500); }
//     .metric-card-icon.purple  { background: rgba(139,92,246,0.08); color: #7c3aed; }
//     .metric-card-icon.amber   { background: rgba(251,191,36,0.1);  color: #d97706; }
//     .metric-card-val {
//       font-family: 'JetBrains Mono', monospace; font-size: 18px; font-weight: 700;
//       color: var(--ink-900); line-height: 1;
//     }
//     .metric-card-label {
//       font-family: 'JetBrains Mono', monospace; font-size: 9.5px; font-weight: 700;
//       color: var(--ink-400); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 3px;
//     }

//     /* ── PATIENT INFO CARD ── */
//     .section-label {
//       font-family: 'JetBrains Mono', monospace; font-size: 10.5px; font-weight: 700;
//       color: var(--ink-400); text-transform: uppercase; letter-spacing: 0.14em;
//       margin-bottom: 10px; display: flex; align-items: center; gap: 6px;
//     }
//     .section-label::before {
//       content: ''; width: 3px; height: 12px; border-radius: 2px;
//       background: var(--blue-600); display: block;
//     }
//     .patient-card {
//       background: var(--white); border: 1px solid var(--ink-100);
//       border-radius: 18px; padding: 20px 24px; margin-bottom: 24px;
//     }
//     .patient-grid {
//       display: grid;
//       grid-template-columns: 2fr 1.5fr 0.8fr 1fr 1fr 1.2fr;
//       gap: 16px;
//     }
//     .field-group { display: flex; flex-direction: column; gap: 5px; }
//     .field-label {
//       font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 700;
//       letter-spacing: 0.12em; color: var(--ink-400); text-transform: uppercase;
//     }
//     .field-wrap { position: relative; }
//     .field-icon {
//       position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
//       color: var(--ink-300); display: flex; pointer-events: none;
//     }
//     .field-input {
//       width: 100%; background: var(--ink-50); border: 1.5px solid var(--ink-100);
//       border-radius: 10px; padding: 9px 12px 9px 36px;
//       font-size: 14px; font-weight: 600; color: var(--ink-900);
//       outline: none; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
//     }
//     .field-input.no-icon { padding-left: 12px; }
//     .field-input:focus { border-color: var(--blue-600); background: var(--white); box-shadow: 0 0 0 3px rgba(37,99,235,0.06); }
//     .field-select {
//       width: 100%; background: var(--ink-50); border: 1.5px solid var(--ink-100);
//       border-radius: 10px; padding: 9px 12px;
//       font-size: 14px; font-weight: 600; color: var(--ink-900);
//       outline: none; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
//       cursor: pointer; appearance: none;
//     }
//     .field-select:focus { border-color: var(--blue-600); background: var(--white); box-shadow: 0 0 0 3px rgba(37,99,235,0.06); }

//     /* ── VITALS HIGHLIGHT ── */
//     .vitals-row { display: flex; gap: 10px; margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--ink-100); }
//     .vital-chip {
//       display: flex; align-items: center; gap: 8px;
//       padding: 8px 14px; border-radius: 10px; flex: 1;
//     }
//     .vital-chip.fever-no  { background: rgba(16,185,129,0.05); border: 1px solid rgba(16,185,129,0.15); }
//     .vital-chip.fever-yes { background: rgba(244,63,94,0.05);  border: 1px solid rgba(244,63,94,0.15); }
//     .vital-chip.spo2-ok   { background: rgba(37,99,235,0.05);  border: 1px solid rgba(37,99,235,0.12); }
//     .vital-chip.spo2-low  { background: rgba(251,191,36,0.07); border: 1px solid rgba(251,191,36,0.2); }
//     .vital-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
//     .vital-dot.green  { background: var(--emerald-500); }
//     .vital-dot.red    { background: var(--rose-500); }
//     .vital-dot.blue   { background: var(--blue-500); }
//     .vital-dot.amber  { background: var(--amber-400); }
//     .vital-key {
//       font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700;
//       text-transform: uppercase; letter-spacing: 0.1em; color: var(--ink-400);
//     }
//     .vital-val {
//       font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 700;
//       color: var(--ink-900); margin-left: auto;
//     }
//     .vital-val.green  { color: var(--emerald-500); }
//     .vital-val.red    { color: var(--rose-500); }
//     .vital-val.blue   { color: var(--blue-600); }
//     .vital-val.amber  { color: #d97706; }

//     /* ── MAIN GRID ── */
//     .main-grid { display: grid; grid-template-columns: 5fr 7fr; gap: 20px; }

//     /* ── UPLOAD PANEL ── */
//     .upload-panel {
//       background: var(--white); border: 1px solid var(--ink-100);
//       border-radius: 18px; padding: 20px; display: flex; flex-direction: column; gap: 14px;
//     }
//     .upload-zone {
//       border: 1.5px dashed var(--ink-200); border-radius: 14px;
//       min-height: 220px; display: flex; flex-direction: column;
//       align-items: center; justify-content: center; gap: 10px;
//       cursor: pointer; transition: all 0.2s; background: var(--ink-50);
//       position: relative; overflow: hidden;
//     }
//     .upload-zone:hover { border-color: var(--blue-500); background: rgba(37,99,235,0.02); }
//     .upload-zone.has-file { border-color: var(--emerald-500); background: rgba(16,185,129,0.02); }
//     .upload-icon-wrap {
//       width: 48px; height: 48px; border-radius: 12px;
//       background: rgba(37,99,235,0.07); display: flex; align-items: center; justify-content: center;
//       color: var(--blue-600);
//     }
//     .upload-zone.has-file .upload-icon-wrap { background: rgba(16,185,129,0.08); color: var(--emerald-500); }
//     .upload-title {
//       font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700;
//       color: var(--ink-600); text-align: center;
//     }
//     .upload-sub { font-size: 12.5px; color: var(--ink-400); text-align: center; }
//     .upload-input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }

//     .scan-btn {
//       width: 100%; border: none; border-radius: 12px; padding: 13px 20px;
//       font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 700;
//       letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer;
//       display: flex; align-items: center; justify-content: center; gap: 10px;
//       color: var(--white); background: var(--ink-900); transition: all 0.2s;
//     }
//     .scan-btn:hover:not(:disabled) { background: var(--blue-600); }
//     .scan-btn:disabled { background: var(--ink-100); color: var(--ink-300); cursor: not-allowed; }
//     .scan-btn.loading { background: var(--blue-600); }
//     @keyframes spin { to { transform: rotate(360deg); } }
//     .spinner { animation: spin 0.8s linear infinite; }

//     /* ── RESULT PANEL ── */
//     .result-panel {
//       background: var(--white); border: 1px solid var(--ink-100);
//       border-radius: 18px; overflow: hidden;
//       min-height: 340px; display: flex; flex-direction: column;
//     }
//     .result-empty {
//       flex: 1; display: flex; flex-direction: column;
//       align-items: center; justify-content: center; gap: 10px;
//       background: var(--ink-50); position: relative; overflow: hidden;
//     }
//     .result-empty-grid {
//       position: absolute; inset: 0;
//       background-image: radial-gradient(var(--ink-200) 1px, transparent 1px);
//       background-size: 20px 20px; opacity: 0.5;
//     }
//     .result-empty-icon { color: var(--ink-200); position: relative; z-index: 1; }
//     .result-empty-icon.loading { color: var(--blue-400); }
//     .result-empty-title {
//       font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 700;
//       color: var(--ink-300); text-transform: uppercase; letter-spacing: 0.1em;
//       position: relative; z-index: 1;
//     }
//     .result-empty-title.loading { color: var(--blue-500); }
//     .result-empty-sub { font-size: 13px; color: var(--ink-300); position: relative; z-index: 1; }

//     /* ── RESPONSIVE ── */
//     @media (max-width: 1100px) {
//       .patient-grid { grid-template-columns: 1fr 1fr 1fr; }
//       .main-grid { grid-template-columns: 1fr; }
//     }
//     @media (max-width: 700px) {
//       .dash-shell { padding: 20px 16px; }
//       .patient-grid { grid-template-columns: 1fr 1fr; }
//       .metrics-strip { flex-wrap: wrap; }
//       .dash-nav { padding: 0 16px; }
//     }
//   `}</style>
// );

// const Dashboard = () => {
//   const [file, setFile] = useState(null);
//   const [patientData, setPatientData] = useState({
//     name: '', id: '', age: '', gender: 'Male', fever: 'No', spo2: '98.0'
//   });
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleInput = (e) => setPatientData({ ...patientData, [e.target.name]: e.target.value });

//   const handleFileChange = (e) => {
//     const f = e.target.files?.[0];
//     if (f) setFile(f);
//   };

//   const triggerAnalysis = async () => {
//     if (!file || !patientData.name || !patientData.id || !patientData.spo2) {
//       alert("Required: Patient Name, Mobile/ID, Oxygen Saturation, and X-ray file.");
//       return;
//     }
//     setLoading(true);
//     setResult(null);
//     const fd = new FormData();
//     fd.append('xray', file);
//     fd.append('patientName', patientData.name);
//     fd.append('patientId', patientData.id);
//     fd.append('age', patientData.age || 0);
//     fd.append('gender', patientData.gender);
//     fd.append('fever', patientData.fever);
//     fd.append('spo2', patientData.spo2);
//     try {
//       const res = await axios.post('https://pneuscan-ai-multimodal-pneumonia-jhqi.onrender.com/api/predict', fd);
//       setResult(res.data);
//     } catch (e) {
//       alert("Analysis Failed. Ensure both servers (Port 5000 and 8000) are running.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const spo2Val = parseFloat(patientData.spo2);
//   const spo2Low = spo2Val < 95;
//   const feverYes = patientData.fever === 'Yes';

//   return (
//     <>
//       <FontLoader />



//       <div className="dash-shell">

//         {/* ── PAGE HEADER ── */}
//         <div className="page-header">
//           <div>
//             <h1 className="page-title">Diagnostic <span>Workstation</span></h1>
//             <div className="page-subtitle">PneuScan AI v1.2 · BIT Radiology Department</div>
//           </div>
//           <div className="header-badge">
//             <ShieldCheck size={13} /> Secure Cloud Encryption
//           </div>
//         </div>

//         {/* ── METRICS STRIP ── */}
//         <div className="metrics-strip">
//           <div className="metric-card">
//             <div className="metric-card-icon blue"><Cpu size={15} /></div>
//             <div>
//               <div className="metric-card-val">98.4%</div>
//               <div className="metric-card-label">Validation Accuracy</div>
//             </div>
//           </div>
//           <div className="metric-card">
//             <div className="metric-card-icon emerald"><Zap size={15} /></div>
//             <div>
//               <div className="metric-card-val">1.2s</div>
//               <div className="metric-card-label">Inference Lag</div>
//             </div>
//           </div>
//           <div className="metric-card">
//             <div className="metric-card-icon purple"><Waves size={15} /></div>
//             <div>
//               <div className="metric-card-val">4-Class</div>
//               <div className="metric-card-label">Attention Sieve</div>
//             </div>
//           </div>
//           <div className="metric-card">
//             <div className="metric-card-icon amber"><Wind size={15} /></div>
//             <div>
//               <div className="metric-card-val">12.4K</div>
//               <div className="metric-card-label">Analyzed Scans</div>
//             </div>
//           </div>
//         </div>

//         {/* ── PATIENT INFO ── */}
//         <div className="section-label">Patient Information</div>
//         <div className="patient-card">
//           <div className="patient-grid">
//             <div className="field-group">
//               <label className="field-label">Patient Full Name</label>
//               <div className="field-wrap">
//                 <span className="field-icon"><UserCircle size={14} /></span>
//                 <input name="name" onChange={handleInput} placeholder="John Doe" className="field-input" />
//               </div>
//             </div>
//             <div className="field-group">
//               <label className="field-label">Mobile / ID Number</label>
//               <input name="id" onChange={handleInput} placeholder="+91 00000 00000" className="field-input no-icon" />
//             </div>
//             <div className="field-group">
//               <label className="field-label">Age</label>
//               <input name="age" type="number" onChange={handleInput} placeholder="Years" className="field-input no-icon" />
//             </div>
//             <div className="field-group">
//               <label className="field-label">Gender</label>
//               <select name="gender" value={patientData.gender} onChange={handleInput} className="field-select">
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <div className="field-group">
//               <label className="field-label">Has Fever?</label>
//               <select name="fever" value={patientData.fever} onChange={handleInput} className="field-select">
//                 <option value="No">No</option>
//                 <option value="Yes">Yes</option>
//               </select>
//             </div>
//             <div className="field-group">
//               <label className="field-label">Oxygen Saturation (SpO2 %)</label>
//               <input name="spo2" type="number" step="0.1" value={patientData.spo2} onChange={handleInput} placeholder="98.0" className="field-input no-icon" />
//             </div>
//           </div>

//           {/* Live vitals chips */}
//           <div className="vitals-row">
//             <div className={`vital-chip ${feverYes ? 'fever-yes' : 'fever-no'}`}>
//               <div className={`vital-dot ${feverYes ? 'red' : 'green'}`} />
//               <span className="vital-key">Fever Status</span>
//               <span className={`vital-val ${feverYes ? 'red' : 'green'}`}>{patientData.fever === 'Yes' ? 'Elevated' : 'Normal'}</span>
//             </div>
//             <div className={`vital-chip ${spo2Low ? 'spo2-low' : 'spo2-ok'}`}>
//               <div className={`vital-dot ${spo2Low ? 'amber' : 'blue'}`} />
//               <span className="vital-key">SpO2 Level</span>
//               <span className={`vital-val ${spo2Low ? 'amber' : 'blue'}`}>{patientData.spo2}% — {spo2Low ? 'Low · Monitor' : 'Within Normal Range'}</span>
//             </div>
//             <div className="vital-chip" style={{ background: 'rgba(37,99,235,0.04)', border: '1px solid rgba(37,99,235,0.1)', flex: 0.6 }}>
//               <div className="vital-dot blue" />
//               <span className="vital-key">Gender</span>
//               <span className="vital-val blue">{patientData.gender}</span>
//             </div>
//             {patientData.age && (
//               <div className="vital-chip" style={{ background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.12)', flex: 0.5 }}>
//                 <div className="vital-dot" style={{ background: '#7c3aed' }} />
//                 <span className="vital-key">Age</span>
//                 <span className="vital-val" style={{ color: '#7c3aed' }}>{patientData.age} yrs</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ── MAIN ANALYSIS GRID ── */}
//         <div className="section-label">Radiograph Analysis</div>
//         <div className="main-grid">

//           {/* Upload + Scan */}
//           <div className="upload-panel">
//             <div className={`upload-zone ${file ? 'has-file' : ''}`}>
//               <input type="file" accept="image/*" className="upload-input" onChange={handleFileChange} />
//               <div className="upload-icon-wrap">
//                 {file ? <FileImage size={22} /> : <Upload size={22} />}
//               </div>
//               <div className="upload-title">
//                 {file ? file.name : 'Drag & Drop or Click to Upload'}
//               </div>
//               <div className="upload-sub">
//                 {file ? `${(file.size / 1024).toFixed(1)} KB · Ready for analysis` : 'Supports JPEG, PNG, DICOM formats'}
//               </div>
//             </div>

//             <button
//               onClick={triggerAnalysis}
//               disabled={loading || !file}
//               className={`scan-btn ${loading ? 'loading' : ''}`}
//             >
//               {loading
//                 ? <><Activity size={15} className="spinner" /> AI Analysis In Progress...</>
//                 : <><Microscope size={15} /> Execute Radiology Scan</>
//               }
//             </button>
//           </div>

//           {/* Result area */}
//           <div className="result-panel">
//             {result ? (
//               <ResultCard result={result} originalFile={file} />
//             ) : (
//               <div className="result-empty">
//                 <div className="result-empty-grid" />
//                 <Activity size={52} className={`result-empty-icon ${loading ? 'loading' : ''}`} />
//                 <div className={`result-empty-title ${loading ? 'loading' : ''}`}>
//                   {loading ? 'Neural Core Processing...' : 'Awaiting DICOM Data Input'}
//                 </div>
//                 <div className="result-empty-sub">Ready for pulmonary assessment</div>
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;




import React, { useState } from 'react';
import axios from 'axios';
import { UserCircle, Activity, ShieldCheck, Microscope, Cpu, Zap, Wind, Waves, Upload, FileImage } from 'lucide-react';
import UploadZone from '../components/UploadZone';
import ResultCard from '../components/ResultCard';

const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@500;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --white:       #ffffff;
      --ink-50:      #f4f6fa;
      --ink-100:     #eaecf4;
      --ink-200:     #d5d9e8;
      --ink-300:     #b0b8cc;
      --ink-400:     #7a8499;
      --ink-500:     #5a6378;
      --ink-600:     #3d4458;
      --ink-900:     #0d1117;
      --blue-400:    #60a5fa;
      --blue-500:    #3b82f6;
      --blue-600:    #2563eb;
      --emerald-400: #34d399;
      --emerald-500: #10b981;
      --rose-500:    #f43f5e;
      --amber-400:   #fbbf24;
      --void:        #04080f;
      --border-dark: rgba(255,255,255,0.07);
    }

    html, body, #root { height: 100%; font-family: 'DM Sans', sans-serif; margin: 0; padding: 0; background: var(--ink-50); overflow-x: hidden; }

    /* ── PAGE SHELL ── */
    .dash-shell { max-width: 1360px; margin: 0 auto; padding: 20px 28px 36px; width: 100%; }

    /* ── PAGE HEADER ── */
    .page-header {
      display: flex; align-items: flex-start; justify-content: space-between;
      margin-bottom: 18px; padding-bottom: 18px;
      border-bottom: 1px solid var(--ink-100);
      gap: 14px; flex-wrap: wrap;
    }
    .page-title {
      font-family: 'Syne', sans-serif; font-size: 34px; font-weight: 800;
      color: var(--ink-900); letter-spacing: -0.03em; line-height: 1;
    }
    .page-title span { color: var(--blue-600); }
    .page-subtitle {
      font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700;
      color: var(--ink-400); text-transform: uppercase; letter-spacing: 0.12em; margin-top: 6px;
    }
    .header-badge {
      display: flex; align-items: center; gap: 7px;
      padding: 8px 14px; border-radius: 10px;
      background: rgba(37,99,235,0.05); border: 1px solid rgba(37,99,235,0.12);
      font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700;
      color: var(--blue-600); text-transform: uppercase; letter-spacing: 0.1em;
      white-space: nowrap;
    }

    /* ── METRICS STRIP ── */
    .metrics-strip {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 10px; margin-bottom: 18px;
    }
    .metric-card {
      min-width: 0;
      background: var(--white); border: 1px solid var(--ink-100);
      border-radius: 14px; padding: 14px 16px;
      display: flex; align-items: center; gap: 12px;
    }
    .metric-card-icon {
      width: 34px; height: 34px; border-radius: 9px;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .metric-card-icon.blue    { background: rgba(37,99,235,0.08);  color: var(--blue-600); }
    .metric-card-icon.emerald { background: rgba(16,185,129,0.08); color: var(--emerald-500); }
    .metric-card-icon.purple  { background: rgba(139,92,246,0.08); color: #7c3aed; }
    .metric-card-icon.amber   { background: rgba(251,191,36,0.1);  color: #d97706; }
    .metric-card-val {
      font-family: 'JetBrains Mono', monospace; font-size: 18px; font-weight: 700;
      color: var(--ink-900); line-height: 1; white-space: nowrap;
    }
    .metric-card-label {
      font-family: 'JetBrains Mono', monospace; font-size: 9.5px; font-weight: 700;
      color: var(--ink-400); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 3px;
    }

    /* ── PATIENT INFO CARD ── */
    .section-label {
      font-family: 'JetBrains Mono', monospace; font-size: 10.5px; font-weight: 700;
      color: var(--ink-400); text-transform: uppercase; letter-spacing: 0.14em;
      margin-bottom: 10px; display: flex; align-items: center; gap: 6px;
    }
    .section-label::before {
      content: ''; width: 3px; height: 12px; border-radius: 2px;
      background: var(--blue-600); display: block;
    }
    .patient-card {
      background: var(--white); border: 1px solid var(--ink-100);
      border-radius: 18px; padding: 20px 24px; margin-bottom: 24px;
    }
    .patient-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;
    }
    .field-group { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
    .field-label {
      font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 700;
      letter-spacing: 0.12em; color: var(--ink-400); text-transform: uppercase;
    }
    .field-wrap { position: relative; }
    .field-icon {
      position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
      color: var(--ink-300); display: flex; pointer-events: none;
    }
    .field-input {
      width: 100%; background: var(--ink-50); border: 1.5px solid var(--ink-100);
      border-radius: 10px; padding: 9px 12px 9px 36px;
      font-size: 14px; font-weight: 600; color: var(--ink-900);
      outline: none; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
    }
    .field-input.no-icon { padding-left: 12px; }
    .field-input:focus { border-color: var(--blue-600); background: var(--white); box-shadow: 0 0 0 3px rgba(37,99,235,0.06); }
    .field-select {
      width: 100%; background: var(--ink-50); border: 1.5px solid var(--ink-100);
      border-radius: 10px; padding: 9px 12px;
      font-size: 14px; font-weight: 600; color: var(--ink-900);
      outline: none; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
      cursor: pointer; appearance: none;
    }
    .field-select:focus { border-color: var(--blue-600); background: var(--white); box-shadow: 0 0 0 3px rgba(37,99,235,0.06); }

    /* ── VITALS HIGHLIGHT ── */
    .vitals-row { display: flex; gap: 10px; margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--ink-100); flex-wrap: wrap; }
    .vital-chip {
      display: flex; align-items: center; gap: 8px;
      padding: 8px 14px; border-radius: 10px; flex: 1 1 150px; min-width: 0;
    }
    .vital-chip.fever-no  { background: rgba(16,185,129,0.05); border: 1px solid rgba(16,185,129,0.15); }
    .vital-chip.fever-yes { background: rgba(244,63,94,0.05);  border: 1px solid rgba(244,63,94,0.15); }
    .vital-chip.spo2-ok   { background: rgba(37,99,235,0.05);  border: 1px solid rgba(37,99,235,0.12); }
    .vital-chip.spo2-low  { background: rgba(251,191,36,0.07); border: 1px solid rgba(251,191,36,0.2); }
    .vital-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
    .vital-dot.green  { background: var(--emerald-500); }
    .vital-dot.red    { background: var(--rose-500); }
    .vital-dot.blue   { background: var(--blue-500); }
    .vital-dot.amber  { background: var(--amber-400); }
    .vital-key {
      font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.1em; color: var(--ink-400);
      white-space: nowrap;
    }
    .vital-val {
      font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 700;
      color: var(--ink-900); margin-left: auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .vital-val.green  { color: var(--emerald-500); }
    .vital-val.red    { color: var(--rose-500); }
    .vital-val.blue   { color: var(--blue-600); }
    .vital-val.amber  { color: #d97706; }

    /* ── MAIN GRID ── */
    .main-grid { display: grid; grid-template-columns: 5fr 7fr; gap: 20px; }

    /* ── UPLOAD PANEL ── */
    .upload-panel {
      background: var(--white); border: 1px solid var(--ink-100);
      border-radius: 18px; padding: 20px; display: flex; flex-direction: column; gap: 14px;
    }
    .upload-zone {
      border: 1.5px dashed var(--ink-200); border-radius: 14px;
      min-height: 220px; display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 10px;
      cursor: pointer; transition: all 0.2s; background: var(--ink-50);
      position: relative; overflow: hidden; padding: 16px; text-align: center;
    }
    .upload-zone:hover { border-color: var(--blue-500); background: rgba(37,99,235,0.02); }
    .upload-zone.has-file { border-color: var(--emerald-500); background: rgba(16,185,129,0.02); }
    .upload-icon-wrap {
      width: 48px; height: 48px; border-radius: 12px;
      background: rgba(37,99,235,0.07); display: flex; align-items: center; justify-content: center;
      color: var(--blue-600); flex-shrink: 0;
    }
    .upload-zone.has-file .upload-icon-wrap { background: rgba(16,185,129,0.08); color: var(--emerald-500); }
    .upload-title {
      font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700;
      color: var(--ink-600); text-align: center; word-break: break-word;
    }
    .upload-sub { font-size: 12.5px; color: var(--ink-400); text-align: center; }
    .upload-input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }

    .scan-btn {
      width: 100%; border: none; border-radius: 12px; padding: 13px 20px;
      font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 700;
      letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 10px;
      color: var(--white); background: var(--ink-900); transition: all 0.2s;
      text-align: center;
    }
    .scan-btn:hover:not(:disabled) { background: var(--blue-600); }
    .scan-btn:disabled { background: var(--ink-100); color: var(--ink-300); cursor: not-allowed; }
    .scan-btn.loading { background: var(--blue-600); }
    @keyframes spin { to { transform: rotate(360deg); } }
    .spinner { animation: spin 0.8s linear infinite; }

    /* ── RESULT PANEL ── */
    .result-panel {
      background: var(--white); border: 1px solid var(--ink-100);
      border-radius: 18px; overflow: hidden;
      min-height: 340px; display: flex; flex-direction: column;
    }
    .result-empty {
      flex: 1; display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 10px;
      background: var(--ink-50); position: relative; overflow: hidden;
      padding: 24px; text-align: center;
    }
    .result-empty-grid {
      position: absolute; inset: 0;
      background-image: radial-gradient(var(--ink-200) 1px, transparent 1px);
      background-size: 20px 20px; opacity: 0.5;
    }
    .result-empty-icon { color: var(--ink-200); position: relative; z-index: 1; }
    .result-empty-icon.loading { color: var(--blue-400); }
    .result-empty-title {
      font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 700;
      color: var(--ink-300); text-transform: uppercase; letter-spacing: 0.1em;
      position: relative; z-index: 1;
    }
    .result-empty-title.loading { color: var(--blue-500); }
    .result-empty-sub { font-size: 13px; color: var(--ink-300); position: relative; z-index: 1; }

    /* ── RESPONSIVE ── */
    @media (max-width: 1100px) {
      .patient-grid { grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); }
      .main-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 768px) {
      .dash-shell { padding: 16px; }
      .page-title { font-size: 26px; }
      .metrics-strip { grid-template-columns: repeat(2, 1fr); }
      .patient-card { padding: 16px 18px; }
      .patient-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
      .vitals-row { flex-direction: column; }
      .vital-chip { flex: 1 1 auto; }
      .vital-val { margin-left: 0; }
    }
    @media (max-width: 480px) {
      .dash-shell { padding: 12px; }
      .page-header { flex-direction: column; align-items: flex-start; gap: 10px; }
      .page-title { font-size: 22px; }
      .header-badge { font-size: 9px; padding: 6px 10px; }
      .metrics-strip { grid-template-columns: repeat(2, 1fr); gap: 8px; }
      .metric-card { padding: 10px 12px; gap: 8px; }
      .metric-card-val { font-size: 15px; }
      .metric-card-label { font-size: 8.5px; }
      .patient-grid { grid-template-columns: 1fr; }
      .upload-zone { min-height: 180px; }
    }
  `}</style>
);

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [patientData, setPatientData] = useState({
    name: '', id: '', age: '', gender: 'Male', fever: 'No', spo2: '98.0'
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => setPatientData({ ...patientData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const triggerAnalysis = async () => {
    if (!file || !patientData.name || !patientData.id || !patientData.spo2) {
      alert("Required: Patient Name, Mobile/ID, Oxygen Saturation, and X-ray file.");
      return;
    }
    setLoading(true);
    setResult(null);
    const fd = new FormData();
    fd.append('xray', file);
    fd.append('patientName', patientData.name);
    fd.append('patientId', patientData.id);
    fd.append('age', patientData.age || 0);
    fd.append('gender', patientData.gender);
    fd.append('fever', patientData.fever);
    fd.append('spo2', patientData.spo2);
    try {
      const res = await axios.post('https://pneuscan-ai-multimodal-pneumonia-jhqi.onrender.com/api/predict', fd);
      setResult(res.data);
    } catch (e) {
      alert("Analysis Failed. Ensure both servers (Port 5000 and 8000) are running.");
    } finally {
      setLoading(false);
    }
  };

  const spo2Val = parseFloat(patientData.spo2);
  const spo2Low = spo2Val < 95;
  const feverYes = patientData.fever === 'Yes';

  return (
    <>
      <FontLoader />



      <div className="dash-shell">

        {/* ── PAGE HEADER ── */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Diagnostic <span>Workstation</span></h1>
            <div className="page-subtitle">PneuScan AI v1.2 · BIT Radiology Department</div>
          </div>
          <div className="header-badge">
            <ShieldCheck size={13} /> Secure Cloud Encryption
          </div>
        </div>

        {/* ── METRICS STRIP ── */}
        <div className="metrics-strip">
          <div className="metric-card">
            <div className="metric-card-icon blue"><Cpu size={15} /></div>
            <div>
              <div className="metric-card-val">98.4%</div>
              <div className="metric-card-label">Validation Accuracy</div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-card-icon emerald"><Zap size={15} /></div>
            <div>
              <div className="metric-card-val">1.2s</div>
              <div className="metric-card-label">Inference Lag</div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-card-icon purple"><Waves size={15} /></div>
            <div>
              <div className="metric-card-val">4-Class</div>
              <div className="metric-card-label">Attention Sieve</div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-card-icon amber"><Wind size={15} /></div>
            <div>
              <div className="metric-card-val">12.4K</div>
              <div className="metric-card-label">Analyzed Scans</div>
            </div>
          </div>
        </div>

        {/* ── PATIENT INFO ── */}
        <div className="section-label">Patient Information</div>
        <div className="patient-card">
          <div className="patient-grid">
            <div className="field-group">
              <label className="field-label">Patient Full Name</label>
              <div className="field-wrap">
                <span className="field-icon"><UserCircle size={14} /></span>
                <input name="name" onChange={handleInput} placeholder="John Doe" className="field-input" />
              </div>
            </div>
            <div className="field-group">
              <label className="field-label">Mobile / ID Number</label>
              <input name="id" onChange={handleInput} placeholder="+91 00000 00000" className="field-input no-icon" />
            </div>
            <div className="field-group">
              <label className="field-label">Age</label>
              <input name="age" type="number" onChange={handleInput} placeholder="Years" className="field-input no-icon" />
            </div>
            <div className="field-group">
              <label className="field-label">Gender</label>
              <select name="gender" value={patientData.gender} onChange={handleInput} className="field-select">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="field-group">
              <label className="field-label">Has Fever?</label>
              <select name="fever" value={patientData.fever} onChange={handleInput} className="field-select">
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <div className="field-group">
              <label className="field-label">Oxygen Saturation (SpO2 %)</label>
              <input name="spo2" type="number" step="0.1" value={patientData.spo2} onChange={handleInput} placeholder="98.0" className="field-input no-icon" />
            </div>
          </div>

          {/* Live vitals chips */}
          <div className="vitals-row">
            <div className={`vital-chip ${feverYes ? 'fever-yes' : 'fever-no'}`}>
              <div className={`vital-dot ${feverYes ? 'red' : 'green'}`} />
              <span className="vital-key">Fever Status</span>
              <span className={`vital-val ${feverYes ? 'red' : 'green'}`}>{patientData.fever === 'Yes' ? 'Elevated' : 'Normal'}</span>
            </div>
            <div className={`vital-chip ${spo2Low ? 'spo2-low' : 'spo2-ok'}`}>
              <div className={`vital-dot ${spo2Low ? 'amber' : 'blue'}`} />
              <span className="vital-key">SpO2 Level</span>
              <span className={`vital-val ${spo2Low ? 'amber' : 'blue'}`}>{patientData.spo2}% — {spo2Low ? 'Low · Monitor' : 'Within Normal Range'}</span>
            </div>
            <div className="vital-chip" style={{ background: 'rgba(37,99,235,0.04)', border: '1px solid rgba(37,99,235,0.1)' }}>
              <div className="vital-dot blue" />
              <span className="vital-key">Gender</span>
              <span className="vital-val blue">{patientData.gender}</span>
            </div>
            {patientData.age && (
              <div className="vital-chip" style={{ background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.12)' }}>
                <div className="vital-dot" style={{ background: '#7c3aed' }} />
                <span className="vital-key">Age</span>
                <span className="vital-val" style={{ color: '#7c3aed' }}>{patientData.age} yrs</span>
              </div>
            )}
          </div>
        </div>

        {/* ── MAIN ANALYSIS GRID ── */}
        <div className="section-label">Radiograph Analysis</div>
        <div className="main-grid">

          {/* Upload + Scan */}
          <div className="upload-panel">
            <div className={`upload-zone ${file ? 'has-file' : ''}`}>
              <input type="file" accept="image/*" className="upload-input" onChange={handleFileChange} />
              <div className="upload-icon-wrap">
                {file ? <FileImage size={22} /> : <Upload size={22} />}
              </div>
              <div className="upload-title">
                {file ? file.name : 'Drag & Drop or Click to Upload'}
              </div>
              <div className="upload-sub">
                {file ? `${(file.size / 1024).toFixed(1)} KB · Ready for analysis` : 'Supports JPEG, PNG, DICOM formats'}
              </div>
            </div>

            <button
              onClick={triggerAnalysis}
              disabled={loading || !file}
              className={`scan-btn ${loading ? 'loading' : ''}`}
            >
              {loading
                ? <><Activity size={15} className="spinner" /> AI Analysis In Progress...</>
                : <><Microscope size={15} /> Execute Radiology Scan</>
              }
            </button>
          </div>

          {/* Result area */}
          <div className="result-panel">
            {result ? (
              <ResultCard result={result} originalFile={file} />
            ) : (
              <div className="result-empty">
                <div className="result-empty-grid" />
                <Activity size={52} className={`result-empty-icon ${loading ? 'loading' : ''}`} />
                <div className={`result-empty-title ${loading ? 'loading' : ''}`}>
                  {loading ? 'Neural Core Processing...' : 'Awaiting DICOM Data Input'}
                </div>
                <div className="result-empty-sub">Ready for pulmonary assessment</div>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Dashboard;

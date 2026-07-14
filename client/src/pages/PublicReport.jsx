// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const PublicReport = () => {
//     const { uid } = useParams();
//     const [code, setCode] = useState('');
//     const [report, setReport] = useState(null);

//     const verifyAccess = async () => {
//         try {
//             const res = await axios.post(`https://pneuscan-ai-multimodal-pneumonia-jhqi.onrender.com/api/public-report/${uid}`, { code });
//             setReport(res.data);
//         } catch (err) { alert("Access Denied"); }
//     };

//     if (!report) {
//         return (
//             <div className="flex flex-col items-center py-20 bg-slate-50 min-h-screen">
//                 <div className="bg-white p-10 rounded-3xl shadow-xl w-96 border-t-4 border-orange-500">
//                     <h2 className="text-2xl font-black mb-4">Patient Portal</h2>
//                     <p className="text-slate-500 mb-6 text-sm">Enter your Access Code (Mobile No) to view your X-ray results.</p>
//                     <input 
//                         type="text" value={code} onChange={(e) => setCode(e.target.value)}
//                         placeholder="Enter Access Code" className="w-full p-4 border rounded-xl mb-4"
//                     />
//                     <button onClick={verifyAccess} className="w-full bg-black text-white py-4 rounded-xl font-bold">VIEW REPORT</button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-4xl mx-auto py-10">
//             <h1 className="text-4xl font-black mb-8 text-blue-600">Secure Medical Report</h1>
//             <div className="grid grid-cols-2 gap-8">
//                 <div className="bg-white p-6 rounded-3xl shadow-lg">
//                     <h3 className="font-bold mb-4">Original X-Ray</h3>
//                     <img src={`https://pneuscan-ai-multimodal-pneumonia-jhqi.onrender.com/uploads/${report.filename}`} className="rounded-xl border shadow-sm" alt="X-ray" />
//                 </div>
//                 <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-red-100">
//                     <h3 className="font-bold mb-4 text-red-600">AI Heatmap Analysis</h3>
//                     <img src={`https://pneuscan-ai-multimodal-pneumonia-jhqi.onrender.com/uploads/${report.heatmapPath}`} className="rounded-xl border shadow-sm" alt="AI Heatmap" />
//                     <p className="mt-4 text-xs text-slate-500 italic">Red areas indicate regions of concern identified by the PneuScan AI model.</p>
//                 </div>
//             </div>
            
//             <div className="mt-8 bg-white p-8 rounded-3xl shadow-lg">
//                 <h3 className="text-xl font-black mb-4">Clinical Findings</h3>
//                 <ul className="list-disc pl-5 space-y-2 text-slate-700">
//                     {report.aiFindings.map((f, i) => <li key={i}>{f}</li>)}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default PublicReport;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PublicReport = () => {
    const { uid } = useParams();
    const [code, setCode] = useState('');
    const [report, setReport] = useState(null);

    const verifyAccess = async () => {
        try {
            const res = await axios.post(`https://pneuscan-ai-multimodal-pneumonia-jhqi.onrender.com/api/public-report/${uid}`, { code });
            setReport(res.data);
        } catch (err) { alert("Access Denied"); }
    };

    if (!report) {
        return (
            <div className="flex flex-col items-center py-12 sm:py-20 px-4 bg-slate-50 min-h-screen">
                <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl w-full max-w-sm border-t-4 border-orange-500">
                    <h2 className="text-xl sm:text-2xl font-black mb-4">Patient Portal</h2>
                    <p className="text-slate-500 mb-6 text-sm">Enter your Access Code (Mobile No) to view your X-ray results.</p>
                    <input 
                        type="text" value={code} onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter Access Code" className="w-full p-4 border rounded-xl mb-4"
                    />
                    <button onClick={verifyAccess} className="w-full bg-black text-white py-4 rounded-xl font-bold">VIEW REPORT</button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4">
            <h1 className="text-2xl sm:text-4xl font-black mb-6 sm:mb-8 text-blue-600">Secure Medical Report</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-lg">
                    <h3 className="font-bold mb-4">Original X-Ray</h3>
                    <img src={`https://pneuscan-ai-multimodal-pneumonia-jhqi.onrender.com/uploads/${report.filename}`} className="w-full rounded-xl border shadow-sm" alt="X-ray" />
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-lg border-2 border-red-100">
                    <h3 className="font-bold mb-4 text-red-600">AI Heatmap Analysis</h3>
                    <img src={`https://pneuscan-ai-multimodal-pneumonia-jhqi.onrender.com/uploads/${report.heatmapPath}`} className="w-full rounded-xl border shadow-sm" alt="AI Heatmap" />
                    <p className="mt-4 text-xs text-slate-500 italic">Red areas indicate regions of concern identified by the PneuScan AI model.</p>
                </div>
            </div>
            
            <div className="mt-6 sm:mt-8 bg-white p-5 sm:p-8 rounded-3xl shadow-lg">
                <h3 className="text-lg sm:text-xl font-black mb-4">Clinical Findings</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-700 text-sm sm:text-base">
                    {report.aiFindings.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
            </div>
        </div>
    );
};

export default PublicReport;

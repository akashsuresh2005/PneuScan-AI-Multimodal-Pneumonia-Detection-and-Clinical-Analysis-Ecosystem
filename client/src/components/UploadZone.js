import React from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

const UploadZone = ({ onFileSelect, file, loading }) => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
      <h3 className="text-xl font-black mb-6 flex items-center gap-2">
        <ImageIcon className="text-bit-orange" /> New Analysis
      </h3>
      <div className="border-4 border-dashed border-slate-100 rounded-2xl p-10 text-center hover:bg-slate-50 transition-all group">
        <input 
          type="file" id="xray-upload" className="hidden" 
          onChange={(e) => onFileSelect(e.target.files[0])} 
        />
        <label htmlFor="xray-upload" className="cursor-pointer">
          <Upload className="mx-auto mb-4 text-slate-300 group-hover:text-bit-blue transition-colors" size={50} />
          <p className="font-bold text-slate-600">{file ? file.name : "Drag & Drop or Click to Upload"}</p>
        </label>
      </div>
    </div>
  );
};

export default UploadZone;
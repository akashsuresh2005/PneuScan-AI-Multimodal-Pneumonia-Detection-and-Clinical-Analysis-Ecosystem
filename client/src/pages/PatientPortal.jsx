import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Download, Stethoscope, Activity, MapPin, Shield } from 'lucide-react';
import { generateProfessionalPDFReport } from '../services/ReportService';

const PatientPortal = ({ patientId }) => {
  const [myRecords, setMyRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://pneuscan-ai-multimodal-pneumonia-jhqi.onrender.com/api/my-reports/${patientId}`)
      .then(res => { setMyRecords(res.data); setLoading(false); })
      .catch(err => { console.error("Access denied to requested medical indices", err); setLoading(false); });
  }, [patientId]);

  return (
    <>
      <style>{`
        .portal-shell {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 16px 48px;
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #f4f6fa;
        }

        /* ── HEADER ── */
        .portal-header {
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eaecf4;
        }
        .portal-title {
          font-size: clamp(24px, 5vw, 36px);
          font-weight: 900;
          color: #0d1117;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }
        .portal-title span { color: #2563eb; }
        .portal-subtitle {
          font-size: 11px;
          font-weight: 700;
          color: #7a8499;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-top: 6px;
          font-family: 'JetBrains Mono', monospace;
        }

        /* ── LOADING ── */
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
          gap: 16px;
        }
        .loading-spinner {
          width: 40px; height: 40px;
          border: 3px solid #eaecf4;
          border-top-color: #2563eb;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── EMPTY STATE ── */
        .empty-state {
          background: white;
          border: 1px solid #eaecf4;
          border-radius: 28px;
          padding: clamp(40px, 8vw, 80px) clamp(20px, 5vw, 60px);
          text-align: center;
          max-width: 480px;
          margin: 40px auto;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }
        .empty-icon {
          width: 64px; height: 64px;
          border-radius: 50%;
          background: #f4f6fa;
          display: flex; align-items: center; justify-content: center;
          color: #b0b8cc;
          margin: 0 auto 20px;
        }
        .empty-title {
          font-size: 16px;
          font-weight: 900;
          color: #0d1117;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-family: 'JetBrains Mono', monospace;
        }
        .empty-sub {
          font-size: 14px;
          color: #7a8499;
          margin-top: 8px;
          line-height: 1.6;
        }

        /* ── GRID ── */
        .records-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 480px), 1fr));
          gap: 20px;
        }

        /* ── RECORD CARD ── */
        .record-card {
          background: white;
          border-radius: 24px;
          border: 1px solid #eaecf4;
          box-shadow: 0 2px 16px rgba(0,0,0,0.05);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .record-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }

        /* ── CARD HEADER ── */
        .card-header {
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          border-bottom: 1px solid #f4f6fa;
        }
        .heatmap-container {
          width: clamp(72px, 15vw, 96px);
          height: clamp(72px, 15vw, 96px);
          border-radius: 16px;
          overflow: hidden;
          background: #0c1017;
          border: 1px solid #eaecf4;
          flex-shrink: 0;
        }
        .heatmap-container img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }
        .heatmap-container:hover img { transform: scale(1.05); }

        .card-meta { flex: 1; min-width: 0; }
        .prediction-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 4px 12px;
          border-radius: 100px;
          margin-bottom: 8px;
        }
        .badge-normal   { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
        .badge-covid    { background: #f5f3ff; color: #7c3aed; border: 1px solid #ddd6fe; }
        .badge-pneumonia{ background: #fff1f2; color: #e11d48; border: 1px solid #fecdd3; }

        .card-date {
          font-size: 11px;
          font-weight: 700;
          color: #7a8499;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-family: 'JetBrains Mono', monospace;
        }
        .card-name {
          font-size: 15px;
          font-weight: 800;
          color: #0d1117;
          margin-top: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* ── METRICS ROW ── */
        .metrics-row {
          display: flex;
          gap: 8px;
          padding: 14px 20px;
          border-bottom: 1px solid #f4f6fa;
          flex-wrap: wrap;
        }
        .metric-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 100px;
          background: #f4f6fa;
          border: 1px solid #eaecf4;
          flex: 1;
          min-width: 120px;
        }
        .metric-chip-label {
          font-size: 9px;
          font-weight: 700;
          color: #7a8499;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-family: 'JetBrains Mono', monospace;
        }
        .metric-chip-val {
          font-size: 12px;
          font-weight: 800;
          color: #0d1117;
          margin-left: auto;
          font-family: 'JetBrains Mono', monospace;
        }

        /* ── FINDINGS ── */
        .findings-section {
          padding: 16px 20px;
          flex: 1;
        }
        .findings-label {
          font-size: 9px;
          font-weight: 900;
          color: #7a8499;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-family: 'JetBrains Mono', monospace;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .findings-label::before {
          content: '';
          width: 3px; height: 10px;
          border-radius: 2px;
          background: #2563eb;
          display: block;
        }
        .finding-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 8px 0;
          border-bottom: 1px solid #f4f6fa;
          font-size: clamp(12px, 2.5vw, 14px);
          color: #3d4458;
          font-weight: 500;
          line-height: 1.5;
        }
        .finding-item:last-child { border-bottom: none; }
        .finding-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #2563eb;
          flex-shrink: 0;
          margin-top: 6px;
        }

        /* ── DOWNLOAD BUTTON ── */
        .download-btn {
          margin: 0 20px 20px;
          width: calc(100% - 40px);
          border: none;
          border-radius: 14px;
          padding: 14px 20px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: white;
          background: #0d1117;
          transition: background 0.2s, transform 0.1s;
        }
        .download-btn:hover { background: #2563eb; }
        .download-btn:active { transform: scale(0.98); }

        /* ── RESPONSIVE ── */
        @media (max-width: 640px) {
          .portal-shell { padding: 16px 12px 40px; }
          .records-grid { grid-template-columns: 1fr; gap: 16px; }
          .card-header { padding: 16px; gap: 12px; }
          .metrics-row { padding: 12px 16px; }
          .metric-chip { min-width: 100px; }
          .findings-section { padding: 12px 16px; }
          .download-btn { margin: 0 16px 16px; width: calc(100% - 32px); }
        }

        @media (max-width: 380px) {
          .metrics-row { flex-direction: column; }
          .metric-chip { min-width: unset; width: 100%; }
        }
      `}</style>

      <div className="portal-shell">

        {/* Header */}
        <div className="portal-header">
          <h2 className="portal-title">
            My Medical <span>Records</span>
          </h2>
          <div className="portal-subtitle">PneuScan AI · Patient Diagnostic Archive</div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p style={{ fontSize: 13, color: '#7a8499', fontWeight: 700, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Fetching Records...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && myRecords.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <Stethoscope size={28} />
            </div>
            <div className="empty-title">No Diagnostics Logged</div>
            <p className="empty-sub">
              There are currently no multimodal radiograph scans linked to your profile parameters.
            </p>
          </div>
        )}

        {/* Records Grid */}
        {!loading && myRecords.length > 0 && (
          <div className="records-grid">
            {myRecords.map((report) => {
              const isNormal = report.prediction === 'NORMAL';
              const isCovid = report.prediction === 'COVID-19 POSITIVE';
              const badgeClass = isNormal ? 'badge-normal' : isCovid ? 'badge-covid' : 'badge-pneumonia';

              return (
                <div key={report._id} className="record-card">

                  {/* Card Header */}
                  <div className="card-header">
                    <div className="heatmap-container">
                      <img
                        src={`https://pneuscan-ai-multimodal-pneumonia-jhqi.onrender.com/uploads/${report.heatmapPath}`}
                        alt="Neural Attention Heatmap"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=200&q=80";
                        }}
                      />
                    </div>
                    <div className="card-meta">
                      <div className={`prediction-badge ${badgeClass}`}>
                        {report.prediction}
                      </div>
                      <div className="card-name">{report.patientName || 'Anonymous Patient'}</div>
                      <div className="card-date">
                        {report.analyzedAt ? new Date(report.analyzedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                      </div>
                    </div>
                  </div>

                  {/* Metrics Row */}
                  <div className="metrics-row">
                    <div className="metric-chip">
                      <Shield size={11} color="#2563eb" />
                      <span className="metric-chip-label">Confidence</span>
                      <span className="metric-chip-val">{report.confidence?.toFixed(1)}%</span>
                    </div>
                    <div className="metric-chip">
                      <Activity size={11} color="#e11d48" />
                      <span className="metric-chip-label">Severity</span>
                      <span className="metric-chip-val" style={{ fontSize: 10 }}>{report.severity || 'N/A'}</span>
                    </div>
                    <div className="metric-chip">
                      <MapPin size={11} color="#7c3aed" />
                      <span className="metric-chip-label">Zone</span>
                      <span className="metric-chip-val" style={{ fontSize: 10 }}>{report.localization || 'N/A'}</span>
                    </div>
                  </div>

                  {/* AI Findings */}
                  <div className="findings-section">
                    <div className="findings-label">AI Observations</div>
                    {(report.aiFindings || []).map((finding, i) => (
                      <div key={i} className="finding-item">
                        <div className="finding-dot" />
                        <span>{finding.replace(/\$?SpO_2\$?/g, "SpO₂")}</span>
                      </div>
                    ))}
                  </div>

                  {/* Download Button */}
                  <button
                    className="download-btn"
                    onClick={() => generateProfessionalPDFReport(report)}
                  >
                    <Download size={14} />
                    Download Clinical Report
                  </button>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </>
  );
};

export default PatientPortal;

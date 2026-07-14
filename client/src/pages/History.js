import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, User, Calendar, Activity, Archive } from 'lucide-react';

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
      --purple-500:  #8b5cf6;
      --void:        #04080f;
      --border-dark: rgba(255,255,255,0.07);
    }

    html, body, #root { height: 100%; font-family: 'DM Sans', sans-serif; margin: 0; padding: 0; background: var(--ink-50); overflow-x: hidden; }

    /* ── SHELL ── */
    .hist-shell { max-width: 1360px; margin: 0 auto; padding: 28px 28px 48px; width: 100%; }

    /* ── PAGE HEADER ── */
    .page-header {
      display: flex; align-items: flex-start; justify-content: space-between;
      margin-bottom: 20px; padding-bottom: 20px;
      border-bottom: 1px solid var(--ink-100);
      gap: 14px; flex-wrap: wrap;
    }
    .page-title {
      font-family: 'Syne', sans-serif; font-size: 34px; font-weight: 800;
      color: var(--ink-900); letter-spacing: -0.03em; line-height: 1;
    }
    .page-title span { color: var(--blue-600); }
    .page-subtitle {
      font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 700;
      color: var(--ink-400); text-transform: uppercase; letter-spacing: 0.12em; margin-top: 7px;
    }
    .record-count-badge {
      display: flex; align-items: center; gap: 7px;
      padding: 8px 16px; border-radius: 10px;
      background: var(--ink-50); border: 1px solid var(--ink-100);
      font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 700;
      color: var(--ink-500); text-transform: uppercase; letter-spacing: 0.1em;
      white-space: nowrap;
    }

    /* ── SECTION LABEL ── */
    .section-label {
      font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 700;
      color: var(--ink-400); text-transform: uppercase; letter-spacing: 0.14em;
      margin-bottom: 12px; display: flex; align-items: center; gap: 6px;
    }
    .section-label::before {
      content: ''; width: 3px; height: 13px; border-radius: 2px;
      background: var(--blue-600); display: block;
    }

    /* ── TABLE CARD ── */
    .table-card {
      background: var(--white); border: 1px solid var(--ink-100);
      border-radius: 18px; overflow: hidden;
    }

    /* ── TABLE ── */
    .hist-table { width: 100%; border-collapse: collapse; }

    .hist-thead { background: var(--ink-50); border-bottom: 1px solid var(--ink-100); }
    .hist-th {
      padding: 14px 24px;
      font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 700;
      color: var(--ink-400); text-transform: uppercase; letter-spacing: 0.12em;
      text-align: left; white-space: nowrap;
    }

    .hist-tr { border-bottom: 1px solid var(--ink-50); transition: background 0.15s; }
    .hist-tr:last-child { border-bottom: none; }
    .hist-tr:hover { background: var(--ink-50); }
    .hist-td { padding: 16px 24px; vertical-align: middle; }

    /* ── PATIENT CELL ── */
    .patient-cell { display: flex; align-items: center; gap: 12px; }
    .patient-avatar {
      width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
      background: rgba(37,99,235,0.07); border: 1px solid rgba(37,99,235,0.12);
      display: flex; align-items: center; justify-content: center;
      color: var(--blue-600);
    }
    .patient-name {
      font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700;
      color: var(--ink-900); line-height: 1.2;
    }
    .patient-meta {
      font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 700;
      color: var(--ink-400); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 3px;
    }

    /* ── PREDICTION BADGES ── */
    .pred-badge {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 6px 14px; border-radius: 6px;
      font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 700;
      letter-spacing: 0.08em; text-transform: uppercase; white-space: nowrap;
    }
    .pred-badge-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
    .pred-badge.normal   { background: rgba(16,185,129,0.08);  color: var(--emerald-500); border: 1px solid rgba(16,185,129,0.2); }
    .pred-badge.covid    { background: rgba(139,92,246,0.08);  color: var(--purple-500);  border: 1px solid rgba(139,92,246,0.2); }
    .pred-badge.bacterial{ background: rgba(244,63,94,0.07);   color: var(--rose-500);    border: 1px solid rgba(244,63,94,0.18); }
    .pred-badge.viral    { background: rgba(251,191,36,0.08);  color: #d97706;            border: 1px solid rgba(251,191,36,0.25); }
    .pred-badge-dot.normal    { background: var(--emerald-500); }
    .pred-badge-dot.covid     { background: var(--purple-500); }
    .pred-badge-dot.bacterial { background: var(--rose-500); }
    .pred-badge-dot.viral     { background: var(--amber-400); }

    /* ── DATE CELL ── */
    .date-cell {
      display: flex; align-items: center; gap: 7px;
      font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 700;
      color: var(--ink-500);
    }
    .date-cell svg { color: var(--blue-500); flex-shrink: 0; }

    /* ── DELETE BTN ── */
    .delete-btn {
      width: 36px; height: 36px; border-radius: 9px; border: none;
      background: transparent; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: var(--ink-300); transition: all 0.15s;
    }
    .delete-btn:hover { background: rgba(244,63,94,0.07); color: var(--rose-500); }

    /* ── EMPTY STATE ── */
    .empty-state {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 72px 24px; gap: 10px;
    }
    .empty-icon {
      width: 52px; height: 52px; border-radius: 14px;
      background: var(--ink-50); border: 1px solid var(--ink-100);
      display: flex; align-items: center; justify-content: center; color: var(--ink-300);
    }
    .empty-title {
      font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: var(--ink-400);
    }
    .empty-sub {
      font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700;
      color: var(--ink-300); text-transform: uppercase; letter-spacing: 0.1em;
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 900px) {
      .hist-shell { padding: 20px 16px; }
      .page-title { font-size: 28px; }
    }

    /* Below 768px: table collapses into stacked cards.
       Each <td> gets a data-label attribute used via ::before for the row label. */
    @media (max-width: 768px) {
      .hist-shell { padding: 16px; }
      .page-title { font-size: 24px; }
      .page-header { flex-direction: column; align-items: flex-start; }

      .hist-table, .hist-tbody, .hist-tr, .hist-td { display: block; width: 100%; }
      .hist-thead { display: none; }

      .hist-tr {
        border: 1px solid var(--ink-100);
        border-radius: 14px;
        margin: 14px;
        overflow: hidden;
      }
      .hist-tr:hover { background: var(--white); }

      .hist-td {
        padding: 12px 16px;
        border-bottom: 1px solid var(--ink-50);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      .hist-td:last-child { border-bottom: none; }

      .hist-td::before {
        content: attr(data-label);
        font-family: 'JetBrains Mono', monospace;
        font-size: 10px;
        font-weight: 700;
        color: var(--ink-400);
        text-transform: uppercase;
        letter-spacing: 0.08em;
        flex-shrink: 0;
      }

      .patient-cell { flex: 1; min-width: 0; }
      .patient-name { font-size: 15px; }
      .patient-meta { font-size: 10.5px; }

      .hist-td[data-label="Actions"] { justify-content: flex-end; }
      .hist-td[data-label="Actions"]::before { display: none; }
    }
  `}</style>
);

const getBadgeClass = (prediction) => {
  if (!prediction) return 'viral';
  const p = prediction.toUpperCase();
  if (p.includes('NORMAL'))    return 'normal';
  if (p.includes('COVID'))     return 'covid';
  if (p.includes('BACTERIAL')) return 'bacterial';
  return 'viral';
};

const History = () => {
  const [records, setRecords] = useState([]);

  const fetchHistory = () => {
    axios.get('https://pneuscan-ai-multimodal-pneumonia-jhqi.onrender.com/api/history')
      .then(res => setRecords(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => { fetchHistory(); }, []);

  const deleteRecord = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this clinical record?")) {
      try {
        await axios.delete(`https://pneuscan-ai-multimodal-pneumonia-jhqi.onrender.com/api/${id}`);
        setRecords(prev => prev.filter(item => item._id !== id));
      } catch (e) {
        console.error(e);
        alert("Delete failed. Check console for details.");
      }
    }
  };

  return (
    <>
      <FontLoader />
      <div className="hist-shell">

        {/* ── PAGE HEADER ── */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Clinical <span>Archives</span></h1>
            <div className="page-subtitle">Comprehensive history of AI-assisted diagnostics</div>
          </div>
          <div className="record-count-badge">
            <Archive size={13} />
            {records.length} {records.length === 1 ? 'Record' : 'Records'}
          </div>
        </div>

        {/* ── TABLE ── */}
        <div className="section-label">Diagnostic Records</div>
        <div className="table-card">
          <table className="hist-table">
            <thead className="hist-thead">
              <tr>
                <th className="hist-th">Patient Information</th>
                <th className="hist-th">AI Diagnosis & Etiology</th>
                <th className="hist-th">Scan Date</th>
                <th className="hist-th">Actions</th>
              </tr>
            </thead>
            <tbody className="hist-tbody">
              {records.length === 0 ? (
                <tr>
                  <td colSpan={4}>
                    <div className="empty-state">
                      <div className="empty-icon"><Activity size={22} /></div>
                      <div className="empty-title">No Records Found</div>
                      <div className="empty-sub">Diagnostic history will appear here</div>
                    </div>
                  </td>
                </tr>
              ) : records.map((r) => {
                const badgeClass = getBadgeClass(r.prediction);
                return (
                  <tr key={r._id} className="hist-tr">

                    {/* Patient */}
                    <td className="hist-td" data-label="Patient Information">
                      <div className="patient-cell">
                        <div className="patient-avatar"><User size={17} /></div>
                        <div>
                          <div className="patient-name">{r.patientName}</div>
                          <div className="patient-meta">
                            ID: {r.patientId} · {r.gender || 'N/A'}, {r.age || 0} Yrs
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Prediction — badge only, no focus/severity text */}
                    <td className="hist-td" data-label="AI Diagnosis">
                      <div className={`pred-badge ${badgeClass}`}>
                        <div className={`pred-badge-dot ${badgeClass}`} />
                        {r.prediction}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="hist-td" data-label="Scan Date">
                      <div className="date-cell">
                        <Calendar size={13} />
                        {new Date(r.analyzedAt).toLocaleDateString('en-IN', {
                          day: '2-digit', month: 'short', year: 'numeric'
                        })}
                      </div>
                    </td>

                    {/* Delete */}
                    <td className="hist-td" data-label="Actions">
                      <button className="delete-btn" onClick={() => deleteRecord(r._id)}>
                        <Trash2 size={16} />
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
};

export default History;





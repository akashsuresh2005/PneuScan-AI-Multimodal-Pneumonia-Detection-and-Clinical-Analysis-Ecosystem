
import React, { useState } from 'react';

import { Lock, Mail, ShieldCheck, Activity, Microscope, Waves, ArrowRight, Cpu, Zap, Wind, Stethoscope, ScanLine, User, HeartPulse } from "lucide-react";



const FontLoader = () => (

  <style>{`

    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@500;700&display=swap');

   

    /* Global resets to ensure nothing else injects padding or margins */

    html, body, #root {

      margin: 0 !important;

      padding: 0 !important;

      width: 100% !important;

      max-width: 100% !important;

      height: 100%;

      font-family: 'DM Sans', sans-serif;

      background: #ffffff;

      overflow-x: hidden;

    }



    *, *::before, *::after {

      box-sizing: border-box;

      margin: 0;

      padding: 0;

    }



    :root {

      --white:         #ffffff;

      --ink-50:        #f4f6fa;

      --ink-100:       #eaecf4;

      --ink-200:       #d5d9e8;

      --ink-300:       #b0b8cc;

      --ink-400:       #7a8499;

      --ink-500:       #5a6378;

      --ink-600:       #3d4458;

      --ink-900:       #0d1117;

      --blue-300:      #93c5fd;

      --blue-400:      #60a5fa;

      --blue-500:      #3b82f6;

      --blue-600:      #2563eb;

      --emerald-400:   #34d399;

      --emerald-500:   #10b981;

      --rose-500:      #f43f5e;

      --amber-400:     #fbbf24;

      --void:          #04080f;

      --border-dark:   rgba(255,255,255,0.07);

    }



    /* ── Shell ── */

    .login-shell {

      display: flex;

      min-height: 100vh;

      background: var(--white);

    }



    /* ── LEFT PANEL ── */

    .left-panel {

      width: 42%;

      display: flex;

      flex-direction: column;

      padding: 24px 40px;

      background: var(--white);

      position: sticky;

      top: 0;

      height: 100vh;

      z-index: 10;

      overflow: hidden;

    }

    .left-panel::before {

      content: '';

      position: absolute;

      inset: 0;

      background: radial-gradient(ellipse 55% 38% at 0% 100%, rgba(37,99,235,0.02) 0%, transparent 70%);

      pointer-events: none;

    }



    /* ── Brand ── */

    .brand { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }

    .brand-icon {

      width: 40px; height: 40px;

      background: var(--ink-900); border-radius: 10px;

      display: flex; align-items: center; justify-content: center;

      color: var(--white); flex-shrink: 0;

    }

    .brand-name {

      font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 800;

      letter-spacing: 0.15em; color: var(--ink-900); text-transform: uppercase;

    }

    .brand-dept {

      font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700;

      letter-spacing: 0.18em; color: var(--ink-500); text-transform: uppercase; margin-top: 2px;

    }



    /* ── Brand image strip — 2 images only ── */

    .brand-image-strip {

      display: grid;

      grid-template-columns: 1fr 1fr;

      gap: 10px;

      margin-top: 14px;

      height: 80px;

      width: 100%;

      flex-shrink: 0;

    }

    .strip-img {

      border-radius: 10px;

      overflow: hidden;

      position: relative;

      border: 1px solid var(--ink-100);

      background: var(--ink-50);

    }

    .strip-img img {

      width: 100%; height: 100%;

      object-fit: cover;

      display: block;

    }

    .strip-img-label {

      position: absolute; bottom: 5px; left: 7px;

      font-family: 'JetBrains Mono', monospace; font-size: 8.5px; font-weight: 700;

      color: #fff; text-transform: uppercase;

      background: rgba(15,23,42,0.78);

      padding: 2px 6px; border-radius: 3px; z-index: 5;

    }



    /* ── Form area ── */

    .form-area {

      flex: 1;

      width: 100%;

      max-width: 420px;

      margin: 20px 0;

      display: flex;

      flex-direction: column;

      justify-content: center;

    }

    .form-heading { margin-bottom: 14px; }

    .form-title {

      font-family: 'Syne', sans-serif; font-size: 30px; font-weight: 700;

      color: var(--ink-900); margin-bottom: 6px; letter-spacing: -0.02em;

    }

    .form-title strong.doctor-accent { color: var(--blue-600); }

    .form-title strong.patient-accent { color: var(--emerald-500); }

    .form-subtitle { font-size: 13.5px; color: var(--ink-500); line-height: 1.6; font-weight: 500; }



    /* ── Role selector ── */

    .role-selector {

      display: grid; grid-template-columns: 1fr 1fr;

      gap: 8px; margin-bottom: 12px;

    }

    .role-card {

      border-radius: 10px; border: 1.5px solid var(--ink-100);

      padding: 11px 13px; cursor: pointer; background: var(--white);

      display: flex; flex-direction: column; gap: 4px;

      position: relative; transition: all 0.2s;

    }

    .role-card.doctor.active  { border-color: var(--blue-500);    background: rgba(37,99,235,0.02); }

    .role-card.patient.active { border-color: var(--emerald-500); background: rgba(16,185,129,0.02); }

    .role-icon-wrap {

      width: 30px; height: 30px; border-radius: 6px;

      display: flex; align-items: center; justify-content: center;

    }

    .role-icon-wrap.doctor  { background: rgba(37,99,235,0.08);  color: var(--blue-600); }

    .role-icon-wrap.patient { background: rgba(16,185,129,0.08); color: var(--emerald-500); }

    .role-label    { font-family: 'Syne', sans-serif; font-size: 14.5px; font-weight: 700; color: var(--ink-900); }

    .role-sublabel { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 700; text-transform: uppercase; color: var(--ink-400); }

    .role-check {

      position: absolute; top: 10px; right: 10px;

      width: 15px; height: 15px; border-radius: 50%;

      display: flex; align-items: center; justify-content: center;

      font-size: 8px; font-weight: 700; opacity: 0;

    }

    .role-card.doctor.active  .role-check { background: var(--blue-600);    color: #fff; opacity: 1; }

    .role-card.patient.active .role-check { background: var(--emerald-500); color: #fff; opacity: 1; }



    /* ── Context banner ── */

    .context-banner {

      display: flex; align-items: center; gap: 8px;

      padding: 9px 13px; border-radius: 8px; margin-bottom: 12px;

      font-size: 12.5px; font-weight: 600;

    }

    .context-banner.doctor  { background: rgba(37,99,235,0.06);  color: var(--blue-600);    border: 1px solid rgba(37,99,235,0.15); }

    .context-banner.patient { background: rgba(16,185,129,0.06); color: var(--emerald-500); border: 1px solid rgba(16,185,129,0.15); }

    .error-banner {

      padding: 9px 13px; background: rgba(244,63,94,0.05);

      border-left: 3px solid var(--rose-500); border-radius: 6px;

      font-size: 12.5px; font-weight: 600; color: #be1239; margin-bottom: 10px;

    }



    /* ── Fields ── */

    .field-group { margin-bottom: 10px; }

    .field-label {

      font-family: 'JetBrains Mono', monospace; font-size: 9.5px; font-weight: 700;

      letter-spacing: 0.12em; color: var(--ink-600); text-transform: uppercase;

      display: block; margin-bottom: 5px;

    }

    .field-wrap { position: relative; }

    .field-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--ink-400); display: flex; }

    .field-input {

      width: 100%; background: var(--ink-50); border: 1.5px solid var(--ink-100);

      border-radius: 10px; padding: 11px 14px 11px 42px;

      font-size: 14.5px; font-weight: 500; color: var(--ink-900);

      outline: none; transition: all 0.2s;

    }

    .field-input::placeholder { color: var(--ink-300); font-size: 13.5px; }

    .field-input.doctor:focus  { border-color: var(--blue-600);    background: var(--white); box-shadow: 0 0 0 3px rgba(37,99,235,0.06); }

    .field-input.patient:focus { border-color: var(--emerald-500); background: var(--white); box-shadow: 0 0 0 3px rgba(16,185,129,0.06); }



    /* ── Password strength ── */

    .strength-row { display: flex; gap: 4px; margin-top: 5px; }

    .strength-bar { flex: 1; height: 3px; border-radius: 2px; background: var(--ink-100); }

    .strength-bar.s1 { background: var(--rose-500); }

    .strength-bar.s2 { background: var(--amber-400); }

    .strength-bar.s3.doctor  { background: var(--blue-500); }

    .strength-bar.s3.patient { background: var(--emerald-500); }



    .forgot-link {

      text-align: right; margin-top: 5px;

      font-size: 12px; font-weight: 700;

      cursor: pointer; text-decoration: none; display: block;

    }

    .forgot-link.doctor  { color: var(--blue-600); }

    .forgot-link.patient { color: var(--emerald-500); }



    /* ── Divider / SSO ── */

    .divider { display: flex; align-items: center; gap: 8px; margin: 9px 0; }

    .divider-line { flex: 1; height: 1px; background: var(--ink-100); }

    .divider-text { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: var(--ink-300); text-transform: uppercase; }

    .sso-btn {

      width: 100%; background: var(--white); border: 1.5px solid var(--ink-200);

      border-radius: 10px; padding: 10px 20px;

      font-size: 13px; font-weight: 600; color: var(--ink-600);

      cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;

    }

    .submit-btn {

      width: 100%; border: none; border-radius: 10px; padding: 12px 20px;

      font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 700;

      letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer;

      display: flex; align-items: center; justify-content: center; gap: 8px;

      color: var(--white); margin-top: 9px; transition: background 0.2s;

    }

    .submit-btn.doctor  { background: var(--ink-900); }

    .submit-btn.patient { background: var(--emerald-500); }

    .submit-btn.doctor:hover  { background: var(--blue-600); }

    .submit-btn.patient:hover { background: #0b9466; }

    .spinner {

      width: 15px; height: 15px;

      border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;

      border-radius: 50%; animation: spin 0.7s linear infinite;

    }

    .form-footer-link { text-align: center; margin-top: 10px; font-size: 12.5px; color: var(--ink-500); }

    .form-footer-link a { font-weight: 700; text-decoration: none; }

    .form-footer-link a.doctor  { color: var(--blue-600); }

    .form-footer-link a.patient { color: var(--emerald-500); }



    /* ── Left footer ── */

    .left-footer {

      padding-top: 10px; margin-top: auto;

      border-top: 1px solid var(--ink-100);

      display: flex; align-items: center; justify-content: space-between;

      flex-shrink: 0;

    }

    .left-footer-label { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 700; color: var(--ink-400); text-transform: uppercase; }

    .status-dot { display: flex; align-items: center; gap: 5px; font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 700; color: var(--emerald-500); text-transform: uppercase; }

    .status-dot::before { content: ''; width: 6px; height: 6px; background: var(--emerald-500); border-radius: 50%; animation: pulse-dot 2s ease-in-out infinite; }

    @keyframes pulse-dot { 0%,100% { opacity:1; } 50% { opacity:0.4; } }



    /* ── RIGHT PANEL ── */

    .right-panel {

      width: 58%;

      background: var(--void);

      position: relative;

      display: flex;

      flex-direction: column;

      padding: 24px 36px;

      border-left: 1px solid rgba(255,255,255,0.04);

    }

    .glow-1 { position: absolute; top: -15%; right: -10%; width: 50%; height: 50%; background: radial-gradient(ellipse, rgba(37,99,235,0.15) 0%, transparent 70%); pointer-events: none; }

    .glow-1.patient { background: radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 70%); }

    .glow-2 { position: absolute; bottom: -15%; left: -5%; width: 40%; height: 40%; background: radial-gradient(ellipse, rgba(16,185,129,0.08) 0%, transparent 70%); pointer-events: none; }

    .glow-2.doctor { background: radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 70%); }

    .dot-grid { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 24px 24px; pointer-events: none; }



    /* ── Metrics ── */

    .metrics-row {

      display: flex; align-items: center; gap: 8px;

      position: relative; z-index: 2; margin-bottom: 16px;

      flex-wrap: wrap;

    }

    .metric-pill {

      display: flex; align-items: center; gap: 9px;

      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);

      border-radius: 9px; padding: 9px 13px;

    }

    .metric-pill-icon { color: var(--blue-400); display: flex; }

    .metric-pill-val {

      font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 700;

      color: rgba(255,255,255,0.97);

    }

    .metric-pill-label {

      font-family: 'JetBrains Mono', monospace; font-size: 9px;

      color: rgba(255,255,255,0.75); text-transform: uppercase; letter-spacing: 0.05em;

    }

    .metric-divider { width: 1px; height: 20px; background: rgba(255,255,255,0.08); }



    /* ── Scan canvas ── */

    .image-grid-section {

      flex: 1;

      position: relative; z-index: 2;

      display: flex; flex-direction: column; gap: 14px;

    }

    .scan-canvas {

      position: relative;

      background: #020609; border-radius: 14px;

      border: 1px solid rgba(255,255,255,0.08);

      overflow: hidden;

      height: 380px;

      flex-shrink: 0;

    }

    .scan-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.6; mix-blend-mode: normal; }

    .hud { position: absolute; inset: 0; padding: 14px 18px; display: flex; flex-direction: column; justify-content: space-between; }

    .hud-top { display: flex; align-items: flex-start; justify-content: space-between; }

    .hud-badge {

      display: flex; align-items: center; gap: 6px;

      font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 700;

      color: var(--emerald-400); background: rgba(16,185,129,0.12);

      border: 1px solid rgba(52,211,153,0.25); padding: 5px 9px; border-radius: 5px;

    }

    .hud-badge-dot { width: 5px; height: 5px; background: var(--emerald-400); border-radius: 50%; animation: pulse-dot 2s ease-in-out infinite; }

    .hud-res { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 600; color: rgba(255,255,255,0.8); background: rgba(0,0,0,0.4); padding: 3px 7px; border-radius: 4px; }

    .reticle { position: absolute; width: 80px; height: 80px; top: 48%; left: 50%; transform: translate(-50%, -50%); }

    .reticle-ring  { position: absolute; inset: 0; border: 1.5px solid rgba(96,165,250,0.4); border-radius: 50%; }

    .reticle-ring-2 { position: absolute; inset: 10px; border: 1px dashed rgba(96,165,250,0.2); border-radius: 50%; }

    .reticle-center { position: absolute; inset: 35px; background: rgba(96,165,250,0.18); border-radius: 50%; }

    .reticle-label {

      position: absolute; top: -22px; left: 50%; transform: translateX(-50%);

      font-family: 'JetBrains Mono', monospace; font-size: 8px; font-weight: 700;

      color: var(--blue-300); text-transform: uppercase; white-space: nowrap;

      background: rgba(0,0,0,0.5); padding: 2px 6px; border-radius: 3px;

    }

    .scan-line { position: absolute; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(37,99,235,0.6), transparent); animation: scan-sweep 3.5s ease-in-out infinite; z-index: 3; }

    @keyframes scan-sweep { 0% { top: 0%; opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { top: 100%; opacity: 0; } }

    .corner { position: absolute; width: 20px; height: 20px; }

    .corner-tl { top: 12px; left: 12px;  border-top:    2px solid rgba(37,99,235,0.65); border-left:  2px solid rgba(37,99,235,0.65); }

    .corner-tr { top: 12px; right: 12px; border-top:    2px solid rgba(37,99,235,0.65); border-right: 2px solid rgba(37,99,235,0.65); }

    .corner-bl { bottom: 12px; left: 12px;  border-bottom: 2px solid rgba(37,99,235,0.65); border-left:  2px solid rgba(37,99,235,0.65); }

    .corner-br { bottom: 12px; right: 12px; border-bottom: 2px solid rgba(37,99,235,0.65); border-right: 2px solid rgba(37,99,235,0.65); }

    .hud-bottom { display: flex; align-items: flex-end; justify-content: space-between; }

    .conf-label { font-family: 'JetBrains Mono', monospace; font-size: 8.5px; font-weight: 700; color: rgba(255,255,255,0.8); text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.08em; }

    .conf-bar-track { width: 120px; height: 4px; background: rgba(255,255,255,0.08); border-radius: 2px; }

    .conf-bar-fill  { height: 100%; width: 94%; background: linear-gradient(90deg, var(--blue-600), var(--emerald-500)); border-radius: 2px; }

    .conf-val     { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; color: var(--emerald-400); margin-top: 5px; }

    .hud-mode     { font-family: 'JetBrains Mono', monospace; font-size: 8.5px; font-weight: 600; color: rgba(255,255,255,0.75); text-align: right; background: rgba(0,0,0,0.4); padding: 3px 7px; border-radius: 4px; }



    /* ── Secondary tiles ── */

    .secondary-imgs { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }

    .sec-img-card {

      position: relative; border-radius: 14px; overflow: hidden;

      height: 130px; border: 1px solid rgba(255,255,255,0.09); background: #010306;

    }

    .sec-img-card img { width: 100%; height: 100%; object-fit: cover; opacity: 0.55; mix-blend-mode: normal; }

    .sec-img-overlay {

      position: absolute; inset: 0;

      display: flex; flex-direction: column; justify-content: flex-end;

      padding: 11px 13px;

      background: linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 55%);

    }

    .sec-img-tag  { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; font-weight: 700; color: rgba(255,255,255,0.95); letter-spacing: 0.06em; }

    .sec-img-sub  { font-size: 10px; color: rgba(255,255,255,0.75); margin-top: 3px; font-weight: 500; }

    .sec-img-badge {

      position: absolute; top: 10px; right: 10px;

      font-family: 'JetBrains Mono', monospace; font-size: 7.5px; font-weight: 700;

      color: var(--emerald-400); background: rgba(16,185,129,0.15);

      border: 1px solid rgba(52,211,153,0.25); padding: 2px 6px; border-radius: 4px;

    }



    /* ── Right footer ── */

    .right-footer {

      display: flex; align-items: center; justify-content: space-between;

      padding-top: 14px; margin-top: 16px;

      border-top: 1px solid rgba(255,255,255,0.06);

      flex-shrink: 0;

    }

    .right-footer-text {

      font-size: 11.5px; color: rgba(255,255,255,0.8); max-width: 360px;

      line-height: 1.6; font-weight: 500;

    }

    .copyright-badge {

      font-family: 'JetBrains Mono', monospace; font-size: 8.5px; font-weight: 700;

      color: var(--blue-300); background: rgba(37,99,235,0.12);

      border: 1px solid rgba(37,99,235,0.2); padding: 5px 12px; border-radius: 14px;

      text-transform: uppercase; white-space: nowrap;

    }



    @keyframes spin { to { transform: rotate(360deg); } }



    /* ── Forgot password modal ── */

    .fp-modal-overlay {

      position: fixed; inset: 0; z-index: 999;

      background: rgba(0,0,0,0.5);

      display: flex; align-items: center; justify-content: center;

    }

    .fp-modal {

      background: var(--white); border-radius: 16px;

      padding: 30px 34px; width: 360px;

      display: flex; flex-direction: column; gap: 13px;

      box-shadow: 0 20px 60px rgba(0,0,0,0.18);

    }

    .fp-modal-icon {

      width: 44px; height: 44px; border-radius: 10px;

      display: flex; align-items: center; justify-content: center;

    }

    .fp-modal-icon.doctor  { background: rgba(37,99,235,0.08);  color: var(--blue-600); }

    .fp-modal-icon.patient { background: rgba(16,185,129,0.08); color: var(--emerald-500); }

    .fp-modal-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; color: var(--ink-900); }

    .fp-modal-sub   { font-size: 13px; color: var(--ink-500); line-height: 1.5; font-weight: 500; }

    .fp-btn-row { display: flex; gap: 9px; margin-top: 4px; }

    .fp-cancel { flex: 1; background: var(--ink-50); border: 1.5px solid var(--ink-100); border-radius: 9px; padding: 10px; font-size: 13px; font-weight: 600; color: var(--ink-500); cursor: pointer; }

    .fp-send { flex: 1; border: none; border-radius: 9px; padding: 10px; font-size: 13px; font-weight: 700; color: #fff; cursor: pointer; }

    .fp-send.doctor  { background: var(--blue-600); }

    .fp-send.patient { background: var(--emerald-500); }

    .fp-success { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 5px; }

    .fp-success-text { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: var(--ink-900); }



    /* ── Responsive ── */

    @media (max-width: 960px) {

      .left-panel, .right-panel { width: 100% !important; height: auto; overflow-y: visible; }

      .right-panel { min-height: 60vh; }

      .scan-canvas { height: 280px; }

      .metric-divider { display: none; }

    }

    @media (max-width: 600px) {

      .left-panel { padding: 20px 16px; }

      .right-panel { padding: 20px 16px; }

      .form-title { font-size: 26px; }

      .secondary-imgs { grid-template-columns: 1fr 1fr; }

      .secondary-imgs .sec-img-card:last-child { display: none; }

      .scan-canvas { height: 220px; }

    }

  `}</style>

);



function ForgotPasswordModal({ role, onClose }) {

  const [email, setEmail] = useState("");

  const [sent, setSent] = useState(false);

  const [loading, setLoading] = useState(false);



  const handleSend = () => {

    if (!email) return;

    setLoading(true);

    setTimeout(() => { setLoading(false); setSent(true); }, 1400);

  };



  return (

    <div className="fp-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>

      <div className="fp-modal">

        <div className={`fp-modal-icon ${role}`}><ShieldCheck size={22} /></div>

        {!sent ? (

          <>

            <div className="fp-modal-title">Reset {role === "doctor" ? "Clinician" : "Patient"} Access</div>

            <div className="fp-modal-sub">Enter your portal address to route a secure reset link configuration.</div>

            <div className="field-wrap">

              <span className="field-icon"><Mail size={14} /></span>

              <input

                type="email"

                className={`field-input ${role}`}

                placeholder={role === "doctor" ? "doctor@institution.edu" : "patient@hospital.com"}

                value={email}

                onChange={(e) => setEmail(e.target.value)}

                onKeyDown={(e) => e.key === "Enter" && handleSend()}

              />

            </div>

            <div className="fp-btn-row">

              <button className="fp-cancel" onClick={onClose}>Cancel</button>

              <button className={`fp-send ${role}`} onClick={handleSend} disabled={loading}>

                {loading ? "Sending..." : "Reset Access"}

              </button>

            </div>

          </>

        ) : (

          <div className="fp-success">

            <div style={{ fontSize: 26, marginBottom: 4, color: "var(--emerald-500)" }}>✓</div>

            <div className="fp-success-text">Reset key transmitted.</div>

            <button className={`fp-send ${role}`} style={{ marginTop: 12, width: "100%" }} onClick={onClose}>Back to Login</button>

          </div>

        )}

      </div>

    </div>

  );

}



export default function Login({ onAuthSuccess }) {

  const [role, setRole] = useState("doctor");

  const [form, setForm] = useState({ email: "", password: "" });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [showFP, setShowFP] = useState(false);

  const [pwStrength, setPwStrength] = useState(0);



  const isDoctor = role === "doctor";



  const calcStrength = (pw) => {

    if (!pw) return 0;

    if (pw.length < 5) return 1;

    if (pw.length < 9 || !/[^a-zA-Z0-9]/.test(pw)) return 2;

    return 3;

  };



  const handleRoleSwitch = (r) => {

    setRole(r);

    setForm({ email: "", password: "" });

    setError("");

    setPwStrength(0);

  };



  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      const res = await fetch("http://localhost:5000/api/auth/login", {

        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ email: form.email, password: form.password, role }),

      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Authentication failed");

      onAuthSuccess?.(data);

    } catch (err) {

      setError(err.message || "Invalid credentials. Please try again.");

    } finally {

      setLoading(false);

    }

  };



  return (

    <>

      <FontLoader />

      {showFP && <ForgotPasswordModal role={role} onClose={() => setShowFP(false)} />}

     

      {/* CRITICAL CHANGE: Added absolute positioning, zero layout constraints,

        and viewport calculation directly via inline styles to break free of any wrapper margins.

      */}

      <div

        className="login-shell"

        style={{

          position: 'absolute',

          top: 0,

          left: 0,

          width: '100vw',

          maxWidth: '100%',

          margin: 0,

          padding: 0,

          boxSizing: 'border-box'

        }}

      >



        {/* ── LEFT PANEL ── */}

        <div className="left-panel">



          {/* Brand + 2-image strip */}

          <div style={{ flexShrink: 0 }}>

            <div className="brand">

              <div className="brand-icon">

                <Activity size={20} strokeWidth={2.5} />

              </div>

              <div>

                <span className="brand-name">PneuScan AI</span>

                <div className="brand-dept">BIT Radiology Dept</div>

              </div>

            </div>



           {/* TWO images — Chest X-Ray & CT */}

<div className="brand-image-strip">

  <div className="strip-img">

    <img

      src="https://images.unsplash.com/photo-1616391182219-e080b4d1043a?auto=format&fit=crop&w=400&q=80"

      alt="Chest X-Ray Machine"

    />

    <span className="strip-img-label">X-Ray</span>

  </div>

  <div className="strip-img">

    <img

      src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=400&q=80"

      alt="CT Scanner Machine"

    />

    <span className="strip-img-label">CT</span>

  </div>

</div>

          </div>



          {/* Form */}

          <div className="form-area">

            <div className="form-heading">

              <h2 className="form-title">

                {isDoctor

                  ? <><strong className="doctor-accent">Clinical</strong> Access</>

                  : <>Patient <strong className="patient-accent">Portal</strong></>}

              </h2>

              <p className="form-subtitle">

                {isDoctor

                  ? "Sign in with your authorized clinical credentials to access the diagnostic platform."

                  : "Sign in to securely view your verified clinical radiograph outputs."}

              </p>

            </div>



            <div className="role-selector">

              <div className={`role-card doctor${isDoctor ? " active" : ""}`} onClick={() => handleRoleSwitch("doctor")}>

                <div className="role-check">✓</div>

                <div className="role-icon-wrap doctor"><Stethoscope size={17} /></div>

                <div>

                  <div className="role-label">Clinician</div>

                  <div className="role-sublabel">Radiologist</div>

                </div>

              </div>

              <div className={`role-card patient${!isDoctor ? " active" : ""}`} onClick={() => handleRoleSwitch("patient")}>

                <div className="role-check">✓</div>

                <div className="role-icon-wrap patient"><HeartPulse size={17} /></div>

                <div>

                  <div className="role-label">Patient</div>

                  <div className="role-sublabel">Portal</div>

                </div>

              </div>

            </div>



            <div className={`context-banner ${role}`}>

              {isDoctor

                ? <><Stethoscope size={14} /> Workstation authorization path mapped</>

                : <><User size={14} /> Encrypted patient document node mapped</>}

            </div>



            <form onSubmit={handleLogin}>

              {error && <div className="error-banner">⚠ {error}</div>}



              <div className="field-group">

                <label className="field-label">{isDoctor ? "Medical Email Address" : "Patient Portal Email / Hospital ID"}</label>

                <div className="field-wrap">

                  <span className="field-icon"><Mail size={15} /></span>

                  <input

                    type="email"

                    className={`field-input ${role}`}

                    placeholder={isDoctor ? "doctor@institution.edu" : "patient@hospital.com"}

                    required

                    value={form.email}

                    onChange={(e) => setForm({ ...form, email: e.target.value })}

                  />

                </div>

              </div>



              <div className="field-group" style={{ marginBottom: 4 }}>

                <label className="field-label">Workstation Security Password</label>

                <div className="field-wrap">

                  <span className="field-icon"><Lock size={15} /></span>

                  <input

                    type="password"

                    className={`field-input ${role}`}

                    placeholder="••••••••"

                    required

                    value={form.password}

                    onChange={(e) => {

                      setForm({ ...form, password: e.target.value });

                      setPwStrength(calcStrength(e.target.value));

                    }}

                  />

                </div>

                {form.password && (

                  <div className="strength-row">

                    {[1, 2, 3].map((n) => (

                      <div key={n} className={`strength-bar${pwStrength >= n ? ` s${pwStrength} ${role}` : ""}`} />

                    ))}

                  </div>

                )}

              </div>



              <a className={`forgot-link ${role}`} href="#" onClick={(e) => { e.preventDefault(); setShowFP(true); }}>

                Reset cluster access parameters? Click here →

              </a>



              {isDoctor && (

                <>

                  <div className="divider">

                    <div className="divider-line" />

                    

                    <div className="divider-line" />

                  </div>

                  

                </>

              )}



              <button type="submit" className={`submit-btn ${role}`} disabled={loading}>

                {loading ? <div className="spinner" /> : (

                  <>

                    {isDoctor ? "Initialize Ecosystem" : "Access Records"}

                    <ArrowRight size={14} />

                  </>

                )}

              </button>

            </form>

          </div>



          <div className="left-footer">

            <span className="left-footer-label">Operational Core v1.2</span>

            <span className="status-dot">TLS Active</span>

          </div>

        </div>



        {/* ── RIGHT PANEL ── */}

        <div className="right-panel" style={{ flexGrow: 1 }}>

          <div className={`glow-1 ${role}`} />

          <div className={`glow-2 ${isDoctor ? "" : "doctor"}`} />

          <div className="dot-grid" />



          {/* Metrics row */}

          <div className="metrics-row">

            <div className="metric-pill">

              <span className="metric-pill-icon"><Cpu size={14} /></span>

              <div>

                <div className="metric-pill-val">98.4%</div>

                <div className="metric-pill-label">Validation Accuracy</div>

              </div>

            </div>

            <div className="metric-divider" />

            <div className="metric-pill">

              <span className="metric-pill-icon" style={{ color: "var(--emerald-400)" }}><Zap size={14} /></span>

              <div>

                <div className="metric-pill-val">1.2s</div>

                <div className="metric-pill-label">Inference Lag</div>

              </div>

            </div>

            <div className="metric-divider" />

            <div className="metric-pill">

              <span className="metric-pill-icon" style={{ color: "#a78bfa" }}><Waves size={14} /></span>

              <div>

                <div className="metric-pill-val">4-Class</div>

                <div className="metric-pill-label">Attention Sieve</div>

              </div>

            </div>

            <div className="metric-divider" />

            <div className="metric-pill">

              <span className="metric-pill-icon" style={{ color: "var(--amber-400)" }}><Wind size={14} /></span>

              <div>

                <div className="metric-pill-val">12.4K</div>

                <div className="metric-pill-label">Analyzed Scans</div>

              </div>

            </div>

          </div>



          <div className="image-grid-section">

            {/* Dual canvas — AI Pneumonia Scan + Medical Imaging */}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, flex: 1 }}>



              {/* AI Pneumonia X-Ray scan card */}

              <div className="scan-canvas" style={{ height: '100%' }}>

                <img

                  className="scan-img"

                  src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=900&q=80"

                  alt="Chest X-Ray AI Analysis"

                  style={{ opacity: 0.7 }}

                />

                <div className="scan-line" />

                <div className="hud">

                  <div className="hud-top">

                    <div className="hud-badge"><div className="hud-badge-dot" />AI SCAN · ACTIVE</div>

                    <div className="hud-res">PNEU-DETECT v3.1</div>

                  </div>

                  <div className="reticle">

                    <div className="reticle-label">Lung Field Analysis</div>

                    <div className="reticle-ring" />

                    <div className="reticle-ring-2" />

                    <div className="reticle-center" />

                  </div>

                  <div className="hud-bottom">

                    <div>

                      <div className="conf-label">Detection Confidence</div>

                      <div className="conf-bar-track"><div className="conf-bar-fill" /></div>

                      <div className="conf-val">94.7% Confirmed</div>

                    </div>

                    <div className="hud-mode">RADIOGRAPH INFERENCE ON</div>

                  </div>

                </div>

                <div className="corner corner-tl" /><div className="corner corner-tr" />

                <div className="corner corner-bl" /><div className="corner corner-br" />

              </div>



              {/* Medical CT / AI imaging card */}

              <div className="scan-canvas" style={{ height: '100%' }}>

                <img

                  className="scan-img"

                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80"

                  alt="CT Lung Scan"

                  style={{ opacity: 0.7 }}

                />

                <div className="scan-line" style={{ animationDelay: '1.2s' }} />

                <div className="hud">

                  <div className="hud-top">

                    <div className="hud-badge"><div className="hud-badge-dot" />CT SCAN · READY</div>

                    <div className="hud-res">THORAX MODULE LIVE</div>

                  </div>

                  <div className="reticle">

                    <div className="reticle-label">Opacity Segmentation</div>

                    <div className="reticle-ring" />

                    <div className="reticle-ring-2" />

                    <div className="reticle-center" />

                  </div>

                  <div className="hud-bottom">

                    <div>

                      <div className="conf-label">Pathology Score</div>

                      <div className="conf-bar-track"><div className="conf-bar-fill" style={{ background: 'linear-gradient(90deg, var(--emerald-500), var(--blue-400))', width: '89%' }} /></div>

                      <div className="conf-val">89.3% Graded</div>

                    </div>

                    <div className="hud-mode">MULTI-CLASS CLASSIFIER ON</div>

                  </div>

                </div>

                <div className="corner corner-tl" /><div className="corner corner-tr" />

                <div className="corner corner-bl" /><div className="corner corner-br" />

              </div>



            </div>



            {/* Secondary tiles — additional AI pneumonia scan images */}

            <div className="secondary-imgs">

              <div className="sec-img-card">

                <img

                  src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=600&q=80"

                  alt="Doctor AI Review"

                />

                <div className="sec-img-badge">LIVE</div>

                <div className="sec-img-overlay">

                  <div className="sec-img-tag">AI-ASSISTED REVIEW</div>

                  <div className="sec-img-sub">Radiologist + model co-analysis</div>

                </div>

              </div>

              <div className="sec-img-card">

                <img

                  src="https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&w=600&q=80"

                  alt="Deep Learning Scan"

                />

                <div className="sec-img-badge">DL</div>

                <div className="sec-img-overlay">

                  <div className="sec-img-tag">DEEP LEARNING NODE</div>

                  <div className="sec-img-sub">ResNet-50 attention heatmap</div>

                </div>

              </div>

            </div>

          </div>



          {/* Right footer */}

          <div className="right-footer">

            <p className="right-footer-text">

              Workstation network combining chest radiograph spatial matrices

              with discrete clinical vector features for pneumonia classification.

            </p>

            <div className="copyright-badge">BIT Radiology © 2026</div>

          </div>

        </div>



      </div>

    </>

  );

} 
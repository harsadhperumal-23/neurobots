import React, { useState } from 'react';
import { Briefcase, Download, Check, FileText } from 'lucide-react';
import { getReportDownloadUrl } from '../api/client';

export default function ReportsView({ _stats, _recentContracts }) {
  const [downloadingId, setDownloadingId] = useState(null);

  const reports = [
    { id: "CTR-2026-0891", title: "Quarterly Executive Statutory Risk Audit", date: "Q3 2026", type: "PDF / DOCX Audit Package", size: "4.8 MB" },
    { id: "CTR-2026-0888", title: "DPDP Act 2023 Section 8 Compliance Brief", date: "Aug 2026", type: "Regulatory Brief", size: "2.1 MB" },
    { id: "CTR-2026-0872", title: "CERT-In 6-Hour Cyber Incident Report", date: "Jul 2026", type: "Compliance Audit", size: "3.4 MB" },
    { id: "CTR-2026-0841", title: "Corporate Balance Sheet Exposure Matrix", date: "Jul 2026", type: "ERM Risk Assessment", size: "1.9 MB" }
  ];

  const handleDownload = (id, format = 'pdf') => {
    setDownloadingId(`${id}-${format}`);
    const url = getReportDownloadUrl(id, format);
    window.open(url, '_blank');
    setTimeout(() => setDownloadingId(null), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div className="signature-accent-bar">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#A07A3E', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <Briefcase size={16} strokeWidth={2} /> Executive Briefings & Statutory Reports
          </div>
          <h1 className="page-title">
            Exportable Audit Reports
          </h1>
          <p className="body-text" style={{ marginTop: '4px' }}>
            Board briefs, statutory compliance packages, and full DPDP clause redline documentation in PDF, DOCX, and JSON.
          </p>
        </div>

        <button 
          className="btn btn-gold"
          onClick={() => handleDownload("CTR-2026-0891", "pdf")}
        >
          <Download size={16} /> Export Board Legal Brief (PDF)
        </button>
      </div>

      <div className="grid-12">
        {reports.map((r) => (
          <div key={r.id} className="col-6 enterprise-card" style={{ padding: '24px', borderLeft: '4px solid #A07A3E', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-gold" style={{ fontSize: '10px' }}>EXECUTIVE BRIEF</span>
                <span className="metadata-text">{r.date}</span>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginTop: '6px' }}>
                {r.title}
              </h3>
              <p className="metadata-text" style={{ marginTop: '2px' }}>
                Format: {r.type} • Size: {r.size}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button 
                className="btn btn-gold btn-sm"
                onClick={() => handleDownload(r.id, "pdf")}
              >

                {downloadingId === `${r.id}-pdf` ? <Check size={13} /> : <Download size={13} />} PDF
              </button>

              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => handleDownload(r.id, "docx")}
              >
                {downloadingId === `${r.id}-docx` ? <Check size={13} /> : <FileText size={13} />} DOCX
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

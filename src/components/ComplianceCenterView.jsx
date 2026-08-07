import React from 'react';
import { Scale } from 'lucide-react';

export default function ComplianceCenterView({ frameworks }) {
  const defaultFrameworks = frameworks || [
    { id: "GDPR", name: "EU General Data Protection Regulation", score: 68, status: "Non-Compliant", color: "#B91C1C", compliantRules: 17, totalRules: 25 },
    { id: "DPDP", name: "India Digital Personal Data Protection Act 2023", score: 72, status: "Action Needed", color: "#B45309", compliantRules: 18, totalRules: 25 },
    { id: "SOC2", name: "SOC 2 Type II Security & Trust Principles", score: 92, status: "Compliant", color: "#15803D", compliantRules: 23, totalRules: 25 },
    { id: "ISO27001", name: "ISO/IEC 27001:2022 Information Security", score: 88, status: "Compliant", color: "#15803D", compliantRules: 22, totalRules: 25 },
    { id: "HIPAA", name: "HIPAA Security & Privacy Safeguards", score: 76, status: "Action Needed", color: "#B45309", compliantRules: 19, totalRules: 25 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div className="signature-accent-bar">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#15803D', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <Scale size={16} strokeWidth={2} /> Enterprise Compliance & Regulatory Hub
          </div>
          <h1 className="page-title">
            Framework Audit & Controls Center
          </h1>
          <p className="body-text" style={{ marginTop: '4px' }}>
            Real-time automated auditing across global privacy regulations and security certifications.
          </p>
        </div>

        <span className="badge badge-gold" style={{ fontSize: '11px' }}>AI VERIFIED AUDIT</span>
      </div>

      {/* CIRCULAR PROGRESS INDICATORS GRID (12 Columns) */}
      <div className="grid-12">
        {defaultFrameworks.map((fw) => {
          const isPassed = fw.score >= 85;
          const isPartial = fw.score >= 70 && fw.score < 85;
          const statusColor = isPassed ? '#15803D' : isPartial ? '#B45309' : '#B91C1C';
          const statusLabel = isPassed ? 'PASS' : isPartial ? 'PARTIAL' : 'FAILED';

          return (
            <div key={fw.id} className="col-4 enterprise-card" style={{ padding: '28px', borderLeft: `4px solid ${statusColor}`, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="badge badge-teal" style={{ fontSize: '10px' }}>{fw.id}</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginTop: '6px', lineHeight: 1.3 }}>
                    {fw.name}
                  </h3>
                </div>

                {/* Circular Progress Gauge */}
                <div style={{ position: 'relative', width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="52" height="52" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20" fill="none" stroke="#F0ECE4" strokeWidth="5" />
                    <circle 
                      cx="25" 
                      cy="25" 
                      r="20" 
                      fill="none" 
                      stroke={statusColor} 
                      strokeWidth="5" 
                      strokeDasharray="125" 
                      strokeDashoffset={125 - (125 * fw.score) / 100} 
                      strokeLinecap="round"
                      transform="rotate(-90 25 25)"
                    />
                  </svg>
                  <div style={{ position: 'absolute', fontSize: '13px', fontWeight: 800, color: statusColor }}>{fw.score}%</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #D6D3D1', paddingTop: '12px', fontSize: '12.5px' }}>
                <span className={`badge ${isPassed ? 'badge-success' : isPartial ? 'badge-warning' : 'badge-danger'}`}>
                  🛡 {statusLabel}
                </span>
                <span style={{ color: '#64748B' }}>
                  <strong>{fw.compliantRules}</strong> / {fw.totalRules} Controls Met
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

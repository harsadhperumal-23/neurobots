import React, { useState } from 'react';
import { 
  Shield, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function RiskAnalysisView({ risksList, onNavigate }) {
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [selectedRisk, setSelectedRisk] = useState(risksList ? risksList[0] : null);

  const filteredRisks = (risksList || []).filter(r => filterSeverity === 'All' || r.severity === filterSeverity);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div className="signature-accent-bar">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#B91C1C', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <Shield size={16} strokeWidth={2} /> Portfolio Legal Risk Matrix
          </div>
          <h1 className="page-title">
            Enterprise Risk & Redline Hub
          </h1>
          <p className="body-text" style={{ marginTop: '4px' }}>
            Identified clause anomalies, balance sheet exposure limits, and recommended legal redlines.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => onNavigate('analysis')}>
          Back to Active Analysis <ArrowRight size={14} />
        </button>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {['All', 'Critical', 'High', 'Medium', 'Low'].map((sev) => (
          <button
            key={sev}
            onClick={() => setFilterSeverity(sev)}
            style={{
              padding: '6px 16px',
              borderRadius: '9999px',
              border: '1px solid #D6D3D1',
              background: filterSeverity === sev ? '#0E7490' : '#FFFFFF',
              color: filterSeverity === sev ? '#FFFFFF' : '#64748B',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 150ms ease'
            }}
          >
            {sev}
          </button>
        ))}
      </div>

      {/* 12-COLUMN MAIN LAYOUT */}
      <div className="grid-12">
        
        {/* Risk Items List (7 Columns) — White Cards with Left Colored Border */}
        <div className="col-7" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredRisks.map((risk) => {
            const isSelected = selectedRisk && selectedRisk.id === risk.id;
            const leftBorderColor = risk.severity === 'Critical' ? '#B91C1C' : risk.severity === 'High' ? '#B45309' : '#0E7490';
            return (
              <div 
                key={risk.id}
                onClick={() => setSelectedRisk(risk)}
                style={{
                  padding: '20px',
                  borderRadius: '18px',
                  background: isSelected ? '#E8F4F4' : '#FFFFFF',
                  border: '1px solid #D6D3D1',
                  borderLeft: `4px solid ${leftBorderColor}`,
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-soft)',
                  transition: 'all 150ms ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#0F172A', fontSize: '14px' }}>
                    <Shield size={16} color={leftBorderColor} /> {risk.clause} ({risk.section})
                  </div>
                  <span className={`badge badge-${risk.severity.toLowerCase()}`}>
                    🛡 {risk.severity}
                  </span>
                </div>

                <div style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5 }}>
                  {risk.issue}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', fontSize: '12px', color: '#78716C' }}>
                  <span>Contract: <strong>{risk.contractName}</strong></span>
                  <span style={{ color: '#B91C1C', fontWeight: 700 }}>Exposure: {risk.financialExposure}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Risk Inspection & Redline (5 Columns) */}
        <div className="col-5 enterprise-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {selectedRisk ? (
            <>
              <div className="signature-accent-bar">
                <span className={`badge badge-${selectedRisk.severity.toLowerCase()}`}>
                  🛡 {selectedRisk.severity} Risk Item
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginTop: '8px' }}>
                  {selectedRisk.clause}
                </h3>
                <p className="metadata-text" style={{ marginTop: '2px' }}>
                  {selectedRisk.section} • {selectedRisk.contractName}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Identified Exposure Issue
                </h4>
                <div style={{ fontSize: '13.5px', color: '#0F172A', lineHeight: 1.6, padding: '12px', background: '#F7F5F1', borderRadius: '10px', border: '1px solid #D6D3D1' }}>
                  {selectedRisk.issue}
                </div>
              </div>

              {/* ✨ Gold Reserved for Recommended Redline Wording */}
              <div style={{ padding: '16px', background: '#FEFCE8', borderRadius: '14px', border: '1.5px solid #FEF08A' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 800, color: '#C49A3A', marginBottom: '6px' }}>
                  <Sparkles size={16} color="#C49A3A" /> ✨ AI Recommended Redline Wording
                </div>
                <div style={{ fontSize: '13px', color: '#0F172A', fontFamily: 'JetBrains Mono, monospace', lineHeight: 1.5, background: '#FFFFFF', padding: '10px', borderRadius: '8px', border: '1px solid #FEF08A' }}>
                  "{selectedRisk.recommendation}"
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Governing Regulation Standard
                </h4>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0E7490' }}>
                  {selectedRisk.regulation || "GDPR Article 33 • Corporate ERM Standard"}
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #D6D3D1' }}>
                <button className="btn btn-primary" style={{ width: '100%', borderRadius: '10px' }} onClick={() => onNavigate('analysis')}>
                  Open 3-Column Legal Review Workspace <ArrowRight size={14} />
                </button>
              </div>
            </>
          ) : (
            <div style={{ color: '#64748B', fontSize: '13px', textAlign: 'center', marginTop: '40px' }}>
              Select a risk item from the left panel to inspect legal exposure.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

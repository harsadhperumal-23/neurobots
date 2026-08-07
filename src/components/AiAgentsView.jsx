import React, { useState } from 'react';
import { 
  Cpu, 
  Loader2, 
  Check
} from 'lucide-react';

export default function AiAgentsView({ agentsList }) {
  const [activeStepIdx, setActiveStepIdx] = useState(3);

  const defaultPipelineNodes = [
    { id: 1, name: "Document Upload", agent: "Ingestion Agent", status: "Completed", time: "0.12 s", confidence: "100%", desc: "Ingests Indian PDF/DOCX binary payload & validates security checksum" },
    { id: 2, name: "OCR & Layout", agent: "OCR Agent", status: "Completed", time: "0.81 s", confidence: "98.4%", desc: "Normalizes page text layer & calculates bounding box coordinates" },
    { id: 3, name: "NER Entity Parsing", agent: "NER Agent", status: "Completed", time: "0.34 s", confidence: "99.1%", desc: "Extracts Indian Rupee ACV (₹), Madras High Court Jurisdiction & Dates" },
    { id: 4, name: "Clause Extraction", agent: "Clause Agent", status: "Running", time: "0.45 s", confidence: "97.8%", desc: "Segments breach windows, liability caps, and DPDP transfer terms" },
    { id: 5, name: "Risk Engine", agent: "Risk Agent", status: "Queued", time: "Pending", confidence: "—", desc: "Evaluates financial risk score (0-100) & balance sheet exposure" },
    { id: 6, name: "Compliance Audit", agent: "Compliance Agent", status: "Queued", time: "Pending", confidence: "—", desc: "Audits DPDP Act 2023, Companies Act 2013, CERT-In, SEBI & GDPR rules" },
    { id: 7, name: "Recommendation", agent: "Redlining Agent", status: "Queued", time: "Pending", confidence: "—", desc: "Formulates specific statutory redline text rewrites & legal rationale" },
    { id: 8, name: "Final Executive Report", agent: "Briefing Agent", status: "Queued", time: "Pending", confidence: "—", desc: "Generates board brief, risk matrix, and exportable PDF audit package" }
  ];

  const pipeline = agentsList || defaultPipelineNodes;
  const activeAgent = pipeline[activeStepIdx] || pipeline[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div className="signature-accent-bar">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0E7490', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <Cpu size={16} strokeWidth={2} /> Autonomous Multi-Agent Orchestration
          </div>
          <h1 className="page-title">
            AI Micro-Agent Execution Pipeline
          </h1>
          <p className="body-text" style={{ marginTop: '4px' }}>
            Real-time visual pipeline of 8 specialized legal agents executing sequential document intelligence.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span className="badge badge-teal">
            <span className="pulse-dot" style={{ backgroundColor: '#0E7490', boxShadow: '0 0 8px #0E7490' }} /> 10 AGENTS ONLINE
          </span>
          <span className="badge badge-gold">DPDP VERIFIED PIPELINE</span>
        </div>
      </div>

      {/* PROFESSIONAL ELEGANT WORKFLOW PIPELINE NODES */}
      <div 
        className="enterprise-card"
        style={{
          padding: '32px 24px',
          overflowX: 'auto',
          background: '#FFFFFF'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: '980px', position: 'relative' }}>
          
          {/* Subtle Connecting Line */}
          <div 
            style={{
              position: 'absolute',
              top: '28px',
              left: '40px',
              right: '40px',
              height: '2px',
              background: '#D6D3D1',
              zIndex: 1
            }}
          />

          {pipeline.map((node, idx) => {
            const isCompleted = node.status === 'Completed';
            const isRunning = node.status === 'Running';
            const isSelected = activeStepIdx === idx;

            return (
              <div 
                key={node.id || idx}
                onClick={() => setActiveStepIdx(idx)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  zIndex: 2,
                  cursor: 'pointer',
                  width: '110px'
                }}
              >
                {/* Node Circle */}
                <div 
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: isCompleted ? '#15803D' : isRunning ? '#0E7490' : '#FFFFFF',
                    color: isCompleted || isRunning ? '#FFFFFF' : '#64748B',
                    border: isCompleted ? '2px solid #15803D' : isRunning ? '3px solid #0E7490' : '2px solid #D6D3D1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isSelected ? '0 0 0 4px rgba(14, 116, 144, 0.2)' : 'var(--shadow-sm)',
                    transition: 'all 150ms ease'
                  }}
                  className={isRunning ? "node-running-glow" : ""}
                >
                  {isCompleted ? (
                    <Check size={18} strokeWidth={2.5} />
                  ) : isRunning ? (
                    <Loader2 size={18} strokeWidth={2.5} style={{ animation: 'spin 1s linear infinite' }} />
                  ) : (
                    <span style={{ fontSize: '13px', fontWeight: 700 }}>{idx + 1}</span>
                  )}
                </div>

                {/* Node Label & Execution Time */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', fontWeight: isSelected ? 800 : 600, color: isSelected ? '#0E7490' : '#0F172A', lineHeight: 1.3 }}>
                    {node.name}
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#78716C', fontFamily: 'JetBrains Mono, monospace', marginTop: '2px' }}>
                    {node.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 12-COLUMN DETAIL INSPECTOR */}
      <div className="grid-12">
        <div className="col-7 enterprise-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="signature-accent-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span className="badge badge-teal" style={{ marginBottom: '6px' }}>Agent #{activeAgent.id || activeStepIdx + 1} Node</span>
              <h2 className="card-title" style={{ fontSize: '20px' }}>{activeAgent.name || activeAgent.agent}</h2>
              <p className="body-text" style={{ marginTop: '4px' }}>{activeAgent.desc}</p>
            </div>
            <span className={`badge ${activeAgent.status === 'Completed' ? 'badge-success' : activeAgent.status === 'Running' ? 'badge-teal' : 'badge-info'}`}>
              {activeAgent.status}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', padding: '16px', background: '#F7F5F1', borderRadius: '12px', border: '1px solid #D6D3D1' }}>
            <div>
              <div className="metadata-text" style={{ textTransform: 'uppercase', fontWeight: 700 }}>Execution Time</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', fontFamily: 'JetBrains Mono, monospace', marginTop: '2px' }}>
                {activeAgent.time}
              </div>
            </div>
            <div>
              <div className="metadata-text" style={{ textTransform: 'uppercase', fontWeight: 700 }}>Model Confidence</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#0E7490', fontFamily: 'JetBrains Mono, monospace', marginTop: '2px' }}>
                {activeAgent.confidence}
              </div>
            </div>
            <div>
              <div className="metadata-text" style={{ textTransform: 'uppercase', fontWeight: 700 }}>Architecture</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#15803D', marginTop: '2px' }}>
                LangGraph Micro-Agent
              </div>
            </div>
          </div>
        </div>

        <div className="col-5 enterprise-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="signature-accent-bar">
            <h2 className="card-title">Pipeline Health Metrics</h2>
            <p className="metadata-text" style={{ marginTop: '2px' }}>Enterprise Agent SLAs</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: '#64748B' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#F8F9FA', borderRadius: '10px', border: '1px solid #D6D3D1' }}>
              <span>Total Pipeline Latency:</span>
              <strong style={{ color: '#0F172A', fontFamily: 'JetBrains Mono, monospace' }}>2.16 s</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#F8F9FA', borderRadius: '10px', border: '1px solid #D6D3D1' }}>
              <span>Average Agent Precision:</span>
              <strong style={{ color: '#15803D', fontFamily: 'JetBrains Mono, monospace' }}>98.9%</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#F8F9FA', borderRadius: '10px', border: '1px solid #D6D3D1' }}>
              <span>Hallucination Guardrails:</span>
              <span className="badge badge-gold" style={{ fontSize: '10px' }}>ZERO TOLERANCE</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

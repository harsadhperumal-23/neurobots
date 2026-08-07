import React, { useState } from 'react';
import { Network } from 'lucide-react';
import { KNOWLEDGE_GRAPH_DATA } from '../mockData';

export default function KnowledgeGraphView() {
  const [selectedNodeId, setSelectedNodeId] = useState("N-1");
  const [filterType, setFilterType] = useState("All");

  const nodes = KNOWLEDGE_GRAPH_DATA.nodes;
  const links = KNOWLEDGE_GRAPH_DATA.links;

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];
  const filteredNodes = nodes.filter(n => filterType === "All" || n.type === filterType);

  const connectedLinks = links.filter(l => l.source === selectedNodeId || l.target === selectedNodeId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div className="signature-accent-bar">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0E7490', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <Network size={16} strokeWidth={2} /> Legal Entity Knowledge Graph
          </div>
          <h1 className="page-title">
            Enterprise Contract Knowledge Graph
          </h1>
          <p className="body-text" style={{ marginTop: '4px' }}>
            Relational topology connecting Indian & global enterprises, agreements, clauses, DPDP laws, and statutory risks.
          </p>
        </div>

        <span className="badge badge-gold" style={{ fontSize: '11px' }}>RAG VECTOR TOPOLOGY</span>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {['All', 'Company', 'Vendor', 'Contract', 'Clause', 'Regulation', 'Risk'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            style={{
              padding: '6px 16px',
              borderRadius: '9999px',
              border: '1px solid #D6D3D1',
              background: filterType === type ? '#0E7490' : '#FFFFFF',
              color: filterType === type ? '#FFFFFF' : '#64748B',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 150ms ease'
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 12-COLUMN KNOWLEDGE GRAPH CANVAS */}
      <div className="grid-12">
        
        {/* GRAPH CANVAS (8 Columns) */}
        <div 
          className="col-8 enterprise-card"
          style={{
            height: '580px',
            padding: '24px',
            position: 'relative',
            background: '#F7F5F1',
            border: '1px solid #D6D3D1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Subtle SVG Connection Edges */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <line x1="220" y1="280" x2="420" y2="160" stroke="#0E7490" strokeWidth="1.75" strokeOpacity="0.4" strokeDasharray="4 4" />
            <line x1="220" y1="280" x2="420" y2="380" stroke="#0E7490" strokeWidth="1.75" strokeOpacity="0.4" strokeDasharray="4 4" />
            <line x1="420" y1="160" x2="620" y2="120" stroke="#0E7490" strokeWidth="1.75" strokeOpacity="0.4" />
            <line x1="420" y1="160" x2="620" y2="220" stroke="#0E7490" strokeWidth="1.75" strokeOpacity="0.4" />
            <line x1="620" y1="120" x2="780" y2="120" stroke="#15803D" strokeWidth="2" />
            <line x1="620" y1="220" x2="780" y2="280" stroke="#B91C1C" strokeWidth="2" />
          </svg>

          {/* Interactive White Graph Nodes with Bronze Active Highlight */}
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {filteredNodes.map((node, i) => {
              const isSelected = selectedNodeId === node.id;
              
              const positions = [
                { top: '45%', left: '15%' }, // N-1 Kaveri Manufacturing
                { top: '22%', left: '42%' }, // N-2 Cauvery Tech
                { top: '65%', left: '42%' }, // N-3 Chennai Digital
                { top: '15%', left: '62%' }, // N-4 MSA Contract
                { top: '35%', left: '62%' }, // N-5 DPA Contract
                { top: '75%', left: '62%' }, // N-6 Sec 12.4
                { top: '85%', left: '40%' }, // N-7 Sec 8.2
                { top: '15%', left: '82%' }, // N-8 DPDP Act
                { top: '35%', left: '82%' }, // N-9 CERT-In
                { top: '55%', left: '82%' }, // N-10 Risk
                { top: '75%', left: '82%' }  // N-11 Obligation
              ];

              const pos = positions[i] || { top: `${30 + (i * 12)}%`, left: `${20 + (i * 10)}%` };

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  style={{
                    position: 'absolute',
                    top: pos.top,
                    left: pos.left,
                    transform: 'translate(-50%, -50%)',
                    background: isSelected ? '#FEFCE8' : '#FFFFFF',
                    border: isSelected ? '2.5px solid #A07A3E' : '1.5px solid #D6D3D1',
                    boxShadow: isSelected ? '0 0 20px rgba(160, 122, 62, 0.25)' : 'var(--shadow-soft)',
                    borderRadius: '14px',
                    padding: '10px 16px',
                    cursor: 'pointer',
                    transition: 'all 150ms ease',
                    zIndex: isSelected ? 10 : 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <div 
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: isSelected ? '#A07A3E' : node.color || '#0E7490'
                    }} 
                  />
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: isSelected ? 800 : 700, color: '#0F172A', lineHeight: 1.2 }}>
                      {node.label}
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#64748B' }}>
                      {node.type}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* NODE INSPECTOR PANEL (4 Columns) */}
        <div className="col-4 enterprise-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="signature-accent-bar">
            <span className="badge badge-gold" style={{ marginBottom: '6px' }}>
              ✨ Active RAG Node
            </span>
            <h2 className="card-title" style={{ fontSize: '20px', marginTop: '4px' }}>
              {selectedNode.label}
            </h2>
            <p className="metadata-text" style={{ marginTop: '2px' }}>
              Category: {selectedNode.type}
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
              Entity Description
            </h4>
            <div style={{ fontSize: '13.5px', color: '#0F172A', lineHeight: 1.5, padding: '12px', background: '#F7F5F1', borderRadius: '10px', border: '1px solid #D6D3D1' }}>
              {selectedNode.desc || "Relational legal topology node indexed in vector database."}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
              Connected Topological Edges ({connectedLinks.length})
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {connectedLinks.map((l, i) => (
                <div key={i} style={{ padding: '10px 12px', borderRadius: '8px', background: '#F8F9FA', border: '1px solid #D6D3D1', fontSize: '12.5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748B' }}>Relation: <strong style={{ color: '#0F172A' }}>{l.label}</strong></span>
                  <span className="badge badge-teal" style={{ fontSize: '10px' }}>{l.target === selectedNodeId ? l.source : l.target}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

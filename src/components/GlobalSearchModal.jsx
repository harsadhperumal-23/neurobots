import React, { useState } from 'react';
import { Search, FileText, X, AlertTriangle, ArrowRight } from 'lucide-react';

export default function GlobalSearchModal({ isOpen, onClose, recentContracts, onNavigate }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = recentContracts.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) || 
    c.vendor.toLowerCase().includes(query.toLowerCase()) ||
    c.id.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '100px'
      }}
      onClick={onClose}
    >
      <div 
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '640px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-highlight)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          borderRadius: 'var(--radius-lg)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
          <Search size={20} color="var(--primary-blue)" />
          <input 
            type="text"
            autoFocus
            className="input-field"
            placeholder="Search contracts, clauses, risks, policies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', fontSize: '15px' }}
          />
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '360px', overflowY: 'auto', padding: '12px' }}>
          {results.length > 0 ? (
            results.map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  onNavigate('analysis');
                  onClose();
                }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  transition: 'background var(--transition-fast)'
                }}
                className="glass-card-interactive"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FileText size={18} color="var(--primary-blue)" />
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-main)' }}>{c.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>{c.id} • Vendor: {c.vendor}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className={`badge badge-${c.riskLevel.toLowerCase()}`}>{c.riskLevel}</span>
                  <ArrowRight size={14} color="var(--text-muted)" />
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-subtle)', fontSize: '13px' }}>
              No matching legal contracts found for "{query}".
            </div>
          )}
        </div>

        <div style={{ padding: '10px 20px', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)', fontSize: '11px', color: 'var(--text-subtle)', display: 'flex', justifyContent: 'space-between' }}>
          <span>Navigate with ↑ ↓ keys</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Plus, 
  Calendar
} from 'lucide-react';

export default function ContractsView({ recentContracts, onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');

  const filteredContracts = recentContracts.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'All' || c.riskLevel.toLowerCase() === riskFilter.toLowerCase();
    return matchesSearch && matchesRisk;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
        <div className="page-title-group">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#6366F1', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <FileText size={16} strokeWidth={1.75} /> Contract Library & Document Management
          </div>
          <h1 className="page-title">Enterprise Contracts Directory</h1>
          <p className="body-text" style={{ marginTop: '4px' }}>
            Central repository of 1,482 analyzed agreements, vendor DPAs, SLAs, and BAAs.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => onNavigate('upload')} style={{ borderRadius: '12px', height: '44px', padding: '0 20px' }}>
          <Plus size={16} strokeWidth={1.75} /> Upload New Contract
        </button>
      </div>

      {/* Main Grid: Search Bar & Table */}
      <div className="grid-12">
        
        {/* Search Bar (12 Columns) */}
        <div 
          className="col-12 enterprise-panel"
          style={{
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
            <Search size={18} strokeWidth={1.75} color="#8B8F98" />
            <input 
              type="text"
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '14.5px',
                width: '100%',
                color: '#1C1C1C'
              }}
              placeholder="Search by contract title, ID, or vendor name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Filter size={15} strokeWidth={1.75} color="#8B8F98" />
            {['All', 'Critical', 'High', 'Medium', 'Low'].map((r) => (
              <button
                key={r}
                onClick={() => setRiskFilter(r)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  border: '1px solid #ECECEC',
                  background: riskFilter === r ? '#6366F1' : '#FFFFFF',
                  color: riskFilter === r ? '#FFFFFF' : '#5E6472',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 150ms ease'
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Contracts Directory Table (Stripe Style) */}
        <div className="col-12 custom-table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Contract Details</th>
                <th>Vendor Name</th>
                <th>Effective Dates</th>
                <th>Contract Value</th>
                <th>Compliance Score</th>
                <th>Risk Level</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#1C1C1C' }}>{c.title}</div>
                    <div style={{ fontSize: '11.5px', color: '#8B8F98', marginTop: '2px' }}>
                      ID: {c.id} • Type: {c.type}
                    </div>
                  </td>
                  <td style={{ fontWeight: 500, color: '#5E6472' }}>{c.vendor}</td>
                  <td>
                    <div style={{ fontSize: '12.5px', color: '#5E6472', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={13} strokeWidth={1.75} /> {c.effectiveDate}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#22C55E' }}>{c.value}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 800, color: c.complianceScore >= 90 ? '#22C55E' : c.complianceScore >= 75 ? '#F59E0B' : '#EF4444' }}>
                      {c.complianceScore}%
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${c.riskLevel.toLowerCase()}`}>
                      {c.riskLevel} Risk
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => onNavigate('analysis')}
                      style={{ borderRadius: '8px' }}
                    >
                      Inspect <ArrowUpRight size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}

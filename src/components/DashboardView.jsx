import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  UploadCloud, 
  ArrowUpRight, 
  ChevronRight,
  Shield,
  ArrowRight,
  Scale,
  Scroll
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { fetchDashboardStats, fetchContracts } from '../api/client';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function DashboardView({ stats: initialStats, recentContracts: initialContracts, _timeline, onNavigate }) {
  const [dashboardStats, setDashboardStats] = useState(initialStats || null);
  const [contractsList, setContractsList] = useState(initialContracts || []);

  useEffect(() => {
    async function loadLiveData() {
      try {
        const liveStats = await fetchDashboardStats();
        if (liveStats) setDashboardStats(liveStats);
        const liveContracts = await fetchContracts();
        if (liveContracts && liveContracts.length > 0) setContractsList(liveContracts);
      } catch (err) {
        console.warn("Backend API fetch exception for dashboard stats:", err);
      }
    }
    loadLiveData();
  }, []);

  const chartData = {
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'DPDP & Global Statutory Compliance (%)',
        data: [82, 85, 87, 90, 92, 94.2],
        borderColor: '#0E7490',
        backgroundColor: '#E8F4F4',
        fill: true,
        tension: 0.2,
        borderWidth: 2.5,
        pointBackgroundColor: '#0E7490',
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'CERT-In / Risk Exposure Clauses',
        data: [28, 24, 20, 18, 15, 14],
        borderColor: '#B91C1C',
        borderDash: [4, 4],
        fill: false,
        tension: 0.2,
        borderWidth: 1.5,
        pointRadius: 0
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          font: { family: 'Inter', size: 12.5, weight: '600' },
          color: '#64748B'
        }
      },
      tooltip: {
        backgroundColor: '#FFFFFF',
        titleColor: '#0F172A',
        bodyColor: '#64748B',
        borderColor: '#D6D3D1',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#78716C', font: { family: 'Inter', size: 12 } }
      },
      y: {
        grid: { color: '#E7E5E4' },
        ticks: { color: '#78716C', font: { family: 'Inter', size: 12 } },
        min: 50,
        max: 100
      }
    }
  };

  const liveAgentFeed = [
    { time: '09:24 AM', agent: 'OCR & Parser Agent', action: 'Tamil Nadu Corporate MSA Normalized', duration: '0.81 s', status: 'Completed' },
    { time: '09:24 AM', agent: 'NER Extraction Agent', action: 'Madras High Court Jurisdiction Extracted', duration: '0.34 s', status: 'Completed' },
    { time: '09:25 AM', agent: 'Risk Engine Agent', action: 'DPDP Act 2023 & CERT-In Mandate Audit', duration: 'Running...', status: 'Running' },
    { time: '09:25 AM', agent: 'Redlining Agent', action: 'Drafting 6h/72h Breach Notice Clause', duration: 'Queued', status: 'Queued' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
      
      {/* 1. HERO PAGE HEADER WITH SIGNATURE TEAL ACCENT BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
        <div className="signature-accent-bar">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0E7490', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
            <Shield size={16} strokeWidth={2} /> Built in India. Ready for the world.
          </div>
          <h1 className="page-title">
            Enterprise Legal Overview
          </h1>
          <p className="body-text" style={{ marginTop: '4px' }}>
            Real-time multi-agent legal oversight, statutory compliance auditing, and automated DPDP/CERT-In clause redlining.
          </p>
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => onNavigate('upload')}
          style={{ height: '44px', padding: '0 20px', borderRadius: '12px' }}
        >
          <UploadCloud size={18} strokeWidth={1.75} />
          <span>Upload New Contract</span>
        </button>
      </div>

      {/* 2. DASHBOARD KPI CARDS */}
      <div className="grid-12">
        
        {/* KPI 1: DPDP Compliance Score */}
        <div className="col-3 enterprise-card" style={{ padding: '24px', borderLeft: '4px solid #15803D' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span className="metadata-text" style={{ textTransform: 'uppercase', fontWeight: 700 }}>Statutory Score</span>
            <Scale size={20} strokeWidth={1.75} color="#15803D" />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1 }}>
            {dashboardStats?.averageComplianceScore || 94.2}%
          </div>
          <div style={{ fontSize: '12.5px', color: '#15803D', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
            <TrendingUp size={14} /> +4.2% <span style={{ color: '#64748B', fontWeight: 400 }}>vs last quarter</span>
          </div>
        </div>

        {/* KPI 2: Circular Risk Gauge Indicator */}
        <div className="col-3 enterprise-card" style={{ padding: '24px', borderLeft: '4px solid #B91C1C' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span className="metadata-text" style={{ textTransform: 'uppercase', fontWeight: 700 }}>Risk Exposure</span>
            <Shield size={20} strokeWidth={1.75} color="#B91C1C" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ position: 'relative', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="56" height="56" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" stroke="#F0ECE4" strokeWidth="5" />
                <circle 
                  cx="25" 
                  cy="25" 
                  r="20" 
                  fill="none" 
                  stroke="#B91C1C" 
                  strokeWidth="5" 
                  strokeDasharray="125" 
                  strokeDashoffset="35" 
                  strokeLinecap="round"
                  transform="rotate(-90 25 25)"
                />
              </svg>
              <div style={{ position: 'absolute', fontSize: '16px', fontWeight: 800, color: '#B91C1C' }}>81</div>
            </div>

            <div>
              <span className="badge badge-critical" style={{ fontSize: '10.5px' }}>🛡 HIGH RISK</span>
              <div style={{ fontSize: '12.5px', color: '#15803D', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                <TrendingDown size={13} /> -11 <span style={{ color: '#64748B', fontWeight: 400 }}>improved</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI 3: Total Contracts */}
        <div className="col-3 enterprise-card" style={{ padding: '24px', borderLeft: '4px solid #0E7490' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span className="metadata-text" style={{ textTransform: 'uppercase', fontWeight: 700 }}>Indexed Agreements</span>
            <Scroll size={20} strokeWidth={1.75} color="#0E7490" />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1 }}>
            {dashboardStats?.totalContracts || 1482}
          </div>
          <div style={{ fontSize: '12.5px', color: '#0E7490', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
            +124 <span style={{ color: '#64748B', fontWeight: 400 }}>this quarter</span>
          </div>
        </div>

        {/* KPI 4: AI Agents */}
        <div className="col-3 enterprise-card" style={{ padding: '24px', borderLeft: '4px solid #A07A3E' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span className="metadata-text" style={{ textTransform: 'uppercase', fontWeight: 700 }}>Statutory Audit</span>
            <span className="badge badge-gold" style={{ fontSize: '10px' }}>DPDP COMPLIANT</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1 }}>
            10 Active
          </div>
          <div style={{ fontSize: '12.5px', color: '#0E7490', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
            <span className="pulse-dot" style={{ backgroundColor: '#0E7490', boxShadow: '0 0 8px #0E7490' }} /> CERT-In Ready Pipeline
          </div>
        </div>

      </div>

      {/* 3. CHARTS & LIVE FEED GRID */}
      <div className="grid-12">
        
        {/* Compliance Trend Chart */}
        <div className="col-8 enterprise-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div className="signature-accent-bar">
              <h2 className="card-title">Statutory Compliance Velocity</h2>
              <p className="metadata-text" style={{ marginTop: '2px' }}>6-month DPDP & Companies Act trajectory</p>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('analytics')}>
              Analytics <ArrowRight size={14} />
            </button>
          </div>
          <div style={{ height: '280px', width: '100%' }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Live Agent Activity Feed */}
        <div className="col-4 enterprise-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="pulse-dot" style={{ backgroundColor: '#0E7490', boxShadow: '0 0 8px #0E7490' }} />
              <h2 className="card-title" style={{ fontSize: '16px' }}>Live Agent Feed</h2>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('agents')}>
              View All <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
            {liveAgentFeed.map((item, idx) => (
              <div 
                key={idx} 
                style={{ 
                  padding: '12px 14px', 
                  borderRadius: '10px', 
                  background: item.status === 'Running' ? '#E8F4F4' : '#F8F9FA',
                  border: item.status === 'Running' ? '1px solid #A5F3FC' : '1px solid #D6D3D1',
                  borderLeft: `3px solid ${item.status === 'Completed' ? '#15803D' : item.status === 'Running' ? '#0E7490' : '#64748B'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                  <span style={{ fontWeight: 700, color: item.status === 'Running' ? '#0E7490' : '#0F172A' }}>
                    {item.agent}
                  </span>
                  <span style={{ color: '#78716C', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace' }}>
                    {item.time}
                  </span>
                </div>
                <div style={{ fontSize: '12.5px', color: '#64748B' }}>
                  {item.action}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', fontSize: '11px' }}>
                  <span className={`badge ${item.status === 'Completed' ? 'badge-success' : item.status === 'Running' ? 'badge-teal' : 'badge-info'}`} style={{ fontSize: '10px' }}>
                    {item.status}
                  </span>
                  <span style={{ color: '#78716C', fontFamily: 'JetBrains Mono, monospace' }}>{item.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. RECENT CONTRACTS DIRECTORY TABLE */}
      <div className="grid-12">
        <div className="col-12 custom-table-container">
          <div style={{ padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #D6D3D1', background: '#FFFFFF' }}>
            <div className="signature-accent-bar">
              <h2 className="card-title">Corporate Agreement Directory</h2>
              <p className="metadata-text" style={{ marginTop: '2px' }}>Showing active Indian & global enterprise contracts</p>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('contracts')}>
              Directory <ArrowUpRight size={14} />
            </button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Contract Name</th>
                <th>Vendor / Party</th>
                <th>Agreement Type</th>
                <th>Upload Date</th>
                <th>Compliance</th>
                <th>Risk Level</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contractsList.slice(0, 5).map((contract) => (
                <tr key={contract.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0F172A' }}>{contract.title}</div>
                    <div style={{ fontSize: '11.5px', color: '#78716C', marginTop: '2px' }}>ID: {contract.id}</div>
                  </td>
                  <td style={{ fontWeight: 500, color: '#64748B' }}>{contract.vendor}</td>
                  <td style={{ fontSize: '13px', color: '#64748B' }}>{contract.type}</td>
                  <td style={{ fontSize: '13px', color: '#78716C' }}>{contract.uploadDate}</td>
                  <td>
                    <div style={{ fontWeight: 800, color: contract.complianceScore >= 90 ? '#15803D' : contract.complianceScore >= 75 ? '#B45309' : '#B91C1C' }}>
                      {contract.complianceScore}%
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${contract.riskLevel.toLowerCase()}`}>
                      🛡 {contract.riskLevel}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => onNavigate('analysis')}
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

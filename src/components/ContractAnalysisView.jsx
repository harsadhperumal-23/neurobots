import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  Download, 
  Sparkles,
  Scale,
  ArrowRight,
  Share2,
  Search,
  Highlighter,
  Zap,
  FileX,
  FileCheck,
  Bot,
  Layers
} from 'lucide-react';
import AiChatDrawer from './AiChatDrawer';

export default function ContractAnalysisView({ contract, onNavigate }) {
  const [selectedHighlightId, setSelectedHighlightId] = useState('h1');
  const [copiedId, setCopiedId] = useState(null);
  const [sharedToast, setSharedToast] = useState(false);
  const [activeTabRight, setActiveTabRight] = useState('analysis'); // 'analysis' | 'related' | 'cases'
  const [objectUrl, setObjectUrl] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [filterClauseType, setFilterClauseType] = useState('All');
  const [pdfZoom, setPdfZoom] = useState(100);

  const docTitle = contract?.name || contract?.title || "Uploaded_Contract.pdf";
  const isPdf = docTitle.toLowerCase().endsWith('.pdf') || (contract?.rawFile && contract.rawFile.type === 'application/pdf');
  const isDocx = docTitle.toLowerCase().endsWith('.docx') || docTitle.toLowerCase().endsWith('.doc');

  useEffect(() => {
    if (contract?.rawFile && isPdf) {
      const url = URL.createObjectURL(contract.rawFile);
      setObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setObjectUrl(null);
  }, [contract, isPdf]);

  if (!contract) {
    return (
      <div 
        className="enterprise-card"
        style={{
          padding: '80px 32px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          maxWidth: '560px',
          margin: '60px auto'
        }}
      >
        <div 
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '20px',
            background: '#F0ECE4',
            color: '#64748B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <FileX size={36} strokeWidth={1.5} />
        </div>

        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.01em' }}>
            No Document Selected
          </h2>
          <p className="body-text" style={{ marginTop: '6px' }}>
            Please select or ingest a contract file from the Ingestion Hub to begin legal analysis.
          </p>
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => onNavigate('upload')}
          style={{ height: '44px', padding: '0 24px', borderRadius: '12px' }}
        >
          Go to Ingestion Hub
        </button>
      </div>
    );
  }

  const defaultRelatedContracts = contract.relatedContracts || [
    { id: "CTR-2025-0412", title: "Manufacturing Supply Addendum", vendor: "Cauvery Technologies Pvt. Ltd.", similarity: "94% Clause Match", risk: "Low" },
    { id: "CTR-2024-0918", title: "Vendor Data Processing Agreement", vendor: "Chennai Digital Solutions Ltd.", similarity: "88% Clause Match", risk: "Medium" }
  ];

  const defaultSimilarCases = contract.similarCases || [
    { id: "CASE-2024-891", title: "High Court of Judicature at Madras Ruling v. Supplier", precedent: "Mandated 2x annual contract liability cap for enterprise supply chain downtime", relevance: "High Precedent" },
    { id: "CASE-2023-114", title: "Data Protection Board Enforcement Action", precedent: "Invalidated 30-day breach notification windows under DPDP Act Section 8", relevance: "Statutory Order" }
  ];

  const highlights = contract.highlights || [
    { 
      id: "h1", 
      section: "Section 12.4", 
      title: "Breach Incident Notification Window",
      type: "Data Breach",
      text: "12.4 Security Incidents: Customer will be notified of data security incidents within thirty (30) days of discovery.", 
      severity: "Critical", 
      page: 1,
      bbox: { x: 5, y: 62, width: 90, height: 12 },
      issue: `Clause in ${docTitle} mandates a 30-day incident notice window, directly violating India DPDP Act 2023 Section 8(6) and CERT-In 6-hour reporting mandates.`,
      recommendation: "Amend notification window to: 'Customer shall be notified in writing without undue delay, and within 6 hours for CERT-In mandates and 72 hours for DPDP 2023 rules, after Provider becomes aware of a Security Breach.'",
      regulation: "DPDP Act 2023 §8(6) • CERT-In Directions 2022",
      confidence: 99.2
    },
    { 
      id: "h2", 
      section: "Section 8.2", 
      title: "Unbalanced Aggregate Liability Cap",
      type: "Liability",
      text: "8.2 Aggregate Liability: In no event shall Provider's total aggregate liability exceed ₹5,00,000 for any and all claims under this agreement.", 
      severity: "High", 
      page: 1,
      bbox: { x: 5, y: 48, width: 90, height: 11 },
      issue: `Disproportionate liability cap (₹5 Lakh) on a ${contract.value || '₹1.25 Cr ACV'} contract creates uncapped corporate balance sheet exposure.`,
      recommendation: "Increase aggregate liability cap to 2x annual contract value (₹2,50,00,000), with zero caps on data breaches or gross negligence.",
      regulation: "Corporate ERM Policy §4.2 • Companies Act 2013 §134",
      confidence: 98.6
    },
    { 
      id: "h3", 
      section: "Section 5.3", 
      title: "Unrestricted International Data Transfer",
      type: "Data Transfer",
      text: "5.3 Data Transfer: Customer grants unrestricted right to transfer personal data across international borders.", 
      severity: "High", 
      page: 1,
      bbox: { x: 5, y: 34, width: 90, height: 10 },
      issue: "Non-compliant with DPDP Section 16 cross-border transfer notifications and EU SCC safeguards.",
      recommendation: "Require execution of Indian DPA Addendum and mandate data localization for Indian resident records.",
      regulation: "DPDP Act 2023 §16 • EU SCCs (2021/914)",
      confidence: 97.9
    },
    { 
      id: "h4", 
      section: "Section 14.1", 
      title: "Foreign Arbitration Jurisdiction",
      type: "Jurisdiction",
      text: "14.1 Governing Law: Any dispute arising out of this agreement shall be submitted to binding arbitration in London under ICC rules.", 
      severity: "Medium", 
      page: 2,
      bbox: { x: 5, y: 22, width: 90, height: 9 },
      issue: "Deviates from corporate legal policy preferring High Court of Judicature at Madras (Chennai Bench), imposing foreign litigation overhead.",
      recommendation: "Replace London ICC arbitration with exclusive venue in the High Court of Judicature at Madras (Chennai), India.",
      regulation: "Corporate Legal Policy §1.4 • Indian Arbitration Act",
      confidence: 96.4
    }
  ];

  const filteredClauses = highlights.filter(h => filterClauseType === 'All' || h.type === filterClauseType);
  const selectedItem = highlights.find(h => h.id === selectedHighlightId) || highlights[0];

  const handleCopyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShare = () => {
    setSharedToast(true);
    setTimeout(() => setSharedToast(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
      
      {/* AI Assistant Chat Drawer */}
      <AiChatDrawer 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        contract={contract} 
      />

      {/* 1. WORKSTATION TOP BAR WITH SIGNATURE TEAL ACCENT BAR */}
      <div 
        className="enterprise-card"
        style={{
          padding: '20px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('contracts')}>
              <ChevronLeft size={16} /> Directory
            </button>
            <div className="signature-accent-bar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h1 className="page-title" style={{ fontSize: '22px' }}>
                  {docTitle}
                </h1>
                <span className="badge badge-teal">{contract.version || "v1.0"}</span>
                <span className="badge badge-gold">DPDP COMPLIANT</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {sharedToast && (
              <span className="badge badge-teal" style={{ textTransform: 'none' }}>✓ Workspace link copied</span>
            )}
            <button className="btn btn-primary btn-sm" onClick={() => setIsChatOpen(true)}>
              <Bot size={15} /> Ask Legal Copilot
            </button>
            <button className="btn btn-secondary btn-sm" onClick={handleShare}>
              <Share2 size={14} /> Share
            </button>
            <button className="btn btn-gold btn-sm" onClick={() => onNavigate('reports')}>
              <Download size={14} /> Export Legal Report
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('risk-analysis')}>
              View Redlines <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Legal Metadata Row */}
        <div style={{ display: 'flex', gap: '28px', borderTop: '1px solid #D6D3D1', paddingTop: '12px', fontSize: '13px', color: '#64748B' }}>
          <div>Vendor / Party: <strong style={{ color: '#0F172A' }}>{contract.vendor || "Enterprise Vendor"}</strong></div>
          <div>Format: <strong style={{ color: '#0F172A' }}>{contract.typeLabel || (isPdf ? "PDF Document" : isDocx ? "Word Document" : "Legal Contract")}</strong></div>
          <div>Contract ACV: <strong style={{ color: '#0F172A' }}>{contract.value || "₹1,25,00,000 / yr"}</strong></div>
          <div>Modified: <strong style={{ color: '#0F172A' }}>{contract.lastModified || contract.modifiedDate || "Just now"}</strong></div>
          <div>Jurisdiction: <strong style={{ color: '#0F172A' }}>{contract.governingLaw || "High Court of Judicature at Madras"}</strong></div>
        </div>
      </div>

      {/* 2. THREE-COLUMN LEGAL REVIEW WORKSPACE */}
      <div style={{ display: 'flex', gap: '24px', height: '820px' }}>
        
        {/* COLUMN 1 (45%): PAPER-INSPIRED PDF WORKSPACE (#FBFAF8) */}
        <div 
          className="enterprise-card"
          style={{ 
            flex: '0 0 45%',
            display: 'flex', 
            flexDirection: 'column', 
            overflow: 'hidden',
            padding: 0,
            position: 'relative',
            background: '#FBFAF8'
          }}
        >
          <div 
            style={{ 
              padding: '10px 16px', 
              background: '#FFFFFF', 
              borderBottom: '1px solid #D6D3D1',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={16} strokeWidth={1.75} color="#0F172A" />
              <span className="label-text" style={{ fontSize: '13px' }}>Paper PDF Surface — Page 1 of {contract.layoutMetadata?.pageCount || 6}</span>
            </div>

            <div 
              style={{ 
                display: 'flex', 
                gap: '2px', 
                alignItems: 'center',
                background: '#F7F5F1',
                border: '1px solid #D6D3D1',
                borderRadius: '10px',
                padding: '2px 6px'
              }}
            >
              <button className="btn btn-secondary btn-sm" style={{ border: 'none', background: 'transparent', padding: '4px' }} onClick={() => setPdfZoom(Math.max(75, pdfZoom - 10))} title="Zoom Out"><ZoomOut size={14} /></button>
              <span className="metadata-text" style={{ fontWeight: 600, padding: '0 4px', color: '#0F172A', fontSize: '12px' }}>{pdfZoom}%</span>
              <button className="btn btn-secondary btn-sm" style={{ border: 'none', background: 'transparent', padding: '4px' }} onClick={() => setPdfZoom(Math.min(150, pdfZoom + 10))} title="Zoom In"><ZoomIn size={14} /></button>
              <div style={{ width: '1px', height: '14px', background: '#D6D3D1', margin: '0 2px' }} />
              <button className="btn btn-secondary btn-sm" style={{ border: 'none', background: 'transparent', padding: '4px' }} title="Search Text"><Search size={14} /></button>
              <button className="btn btn-secondary btn-sm" style={{ border: 'none', background: 'transparent', padding: '4px' }} title="Highlight Clause"><Highlighter size={14} /></button>
            </div>
          </div>

          {isPdf && objectUrl ? (
            <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%', background: '#FBFAF8' }}>
              <iframe 
                src={objectUrl} 
                width="100%" 
                height="100%" 
                style={{ border: 'none', background: '#FBFAF8', transform: `scale(${pdfZoom / 100})`, transformOrigin: 'top left' }} 
                title={docTitle}
              />
            </div>
          ) : isDocx ? (
            <div 
              style={{ 
                flex: 1, 
                padding: '40px 24px', 
                overflowY: 'auto', 
                backgroundColor: '#FBFAF8', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '20px', 
                alignItems: 'center', 
                textAlign: 'center' 
              }}
            >
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#E8F4F4', color: '#0E7490', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileCheck size={32} strokeWidth={1.75} />
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>{docTitle}</h3>
                <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>Microsoft Word Document (.docx)</p>
              </div>
            </div>
          ) : (
            <div 
              style={{ 
                flex: 1, 
                padding: '36px 48px', 
                overflowY: 'auto', 
                backgroundColor: '#FBFAF8', 
                color: '#0F172A',
                fontSize: '15px',
                lineHeight: 1.75,
                fontFamily: 'Georgia, serif',
                position: 'relative'
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '32px', borderBottom: '1px solid #D6D3D1', paddingBottom: '20px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.02em' }}>
                  {docTitle.replace(/\.[^/.]+$/, "").toUpperCase()}
                </h2>
                <p style={{ fontSize: '12px', color: '#64748B', fontStyle: 'italic', marginTop: '4px' }}>
                  Legal Execution Copy • High Court Jurisdiction
                </p>
              </div>

              {highlights.map((h, idx) => {
                const isSelected = selectedHighlightId === h.id;
                const overlayBg = h.severity === 'Critical' 
                  ? 'rgba(185, 28, 28, 0.12)' 
                  : h.severity === 'High' || h.severity === 'Medium' 
                  ? 'rgba(180, 83, 9, 0.12)' 
                  : 'rgba(14, 116, 144, 0.12)';

                const borderColor = h.severity === 'Critical' ? '#B91C1C' : h.severity === 'High' ? '#B45309' : '#0E7490';

                return (
                  <div key={h.id} style={{ marginBottom: '28px', position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong>{idx + 1}. {h.title.toUpperCase()}.</strong>
                      <span className={`badge badge-${h.severity.toLowerCase()}`} style={{ fontSize: '10px' }}>
                        {h.section}
                      </span>
                    </div>

                    <div 
                      onClick={() => setSelectedHighlightId(h.id)}
                      style={{ 
                        backgroundColor: isSelected ? overlayBg : 'rgba(0,0,0,0.02)',
                        borderLeft: `4px solid ${borderColor}`,
                        padding: '12px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        margin: '10px 0',
                        boxShadow: isSelected ? `0 0 0 2px ${borderColor}40` : 'none',
                        transition: 'all 150ms ease',
                        position: 'relative'
                      }}
                    >
                      <strong>{h.section}:</strong> {h.text}

                      {isSelected && (
                        <div 
                          style={{ 
                            position: 'absolute', 
                            top: '-26px', 
                            right: '12px', 
                            background: '#0F172A', 
                            color: '#FFFFFF', 
                            padding: '2px 8px', 
                            borderRadius: '4px', 
                            fontSize: '11px', 
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Layers size={11} color="#0E7490" /> Bounding Box ({h.bbox.x}%, {h.bbox.y}%)
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* COLUMN 2 (25%): DETECTED CLAUSES LIST */}
        <div 
          className="enterprise-card"
          style={{ 
            flex: '0 0 25%',
            display: 'flex', 
            flexDirection: 'column', 
            overflowY: 'auto',
            padding: '20px',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="card-title" style={{ fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={16} color="#0E7490" /> Clause Taxonomy ({filteredClauses.length})
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {['All', 'Data Breach', 'Liability', 'Data Transfer', 'Jurisdiction'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterClauseType(type)}
                style={{
                  padding: '3px 8px',
                  borderRadius: '6px',
                  border: '1px solid #D6D3D1',
                  background: filterClauseType === type ? '#0E7490' : '#F8F9FA',
                  color: filterClauseType === type ? '#FFFFFF' : '#64748B',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 150ms ease'
                }}
              >
                {type}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, overflowY: 'auto' }}>
            {filteredClauses.map((h) => {
              const isSelected = selectedHighlightId === h.id;
              const leftBorderColor = h.severity === 'Critical' ? '#B91C1C' : h.severity === 'High' ? '#B45309' : '#0E7490';
              return (
                <div 
                  key={h.id}
                  onClick={() => setSelectedHighlightId(h.id)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: isSelected ? '#E8F4F4' : '#FFFFFF',
                    border: '1px solid #D6D3D1',
                    borderLeft: `4px solid ${leftBorderColor}`,
                    cursor: 'pointer',
                    transition: 'all 150ms ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: isSelected ? '#0E7490' : '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FileText size={14} color={leftBorderColor} /> {h.section}
                    </span>
                    <span className={`badge badge-${h.severity.toLowerCase()}`} style={{ fontSize: '10px' }}>
                      {h.severity}
                    </span>
                  </div>

                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                    {h.title}
                  </div>

                  <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.4 }}>
                    {h.text.substring(0, 75)}...
                  </div>

                  <div className="metadata-text" style={{ fontSize: '11px', color: '#78716C', marginTop: '2px' }}>
                    Page {h.page} • Conf: {h.confidence || 98}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMN 3 (30%): DYNAMIC AI INSIGHTS & REDLINE PANEL */}
        <div 
          className="enterprise-card"
          style={{ 
            flex: '0 0 30%',
            display: 'flex', 
            flexDirection: 'column', 
            overflowY: 'auto',
            padding: '24px',
            gap: '20px'
          }}
        >
          <div style={{ display: 'flex', gap: '6px', background: '#F7F5F1', padding: '4px', borderRadius: '12px', border: '1px solid #D6D3D1' }}>
            <button 
              onClick={() => setActiveTabRight('analysis')}
              style={{
                flex: 1,
                border: 'none',
                background: activeTabRight === 'analysis' ? '#E8F4F4' : 'transparent',
                fontSize: '12px',
                fontWeight: activeTabRight === 'analysis' ? 700 : 500,
                color: activeTabRight === 'analysis' ? '#0E7490' : '#64748B',
                cursor: 'pointer',
                borderRadius: '8px',
                padding: '6px 8px',
                transition: 'all 150ms ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
            >
              <Sparkles size={13} color="#A07A3E" /> AI Redlines
            </button>
            <button 
              onClick={() => setActiveTabRight('related')}
              style={{
                flex: 1,
                border: 'none',
                background: activeTabRight === 'related' ? '#E8F4F4' : 'transparent',
                fontSize: '12px',
                fontWeight: activeTabRight === 'related' ? 700 : 500,
                color: activeTabRight === 'related' ? '#0E7490' : '#64748B',
                cursor: 'pointer',
                borderRadius: '8px',
                padding: '6px 8px'
              }}
            >
              Related ({defaultRelatedContracts.length})
            </button>
            <button 
              onClick={() => setActiveTabRight('cases')}
              style={{
                flex: 1,
                border: 'none',
                background: activeTabRight === 'cases' ? '#E8F4F4' : 'transparent',
                fontSize: '12px',
                fontWeight: activeTabRight === 'cases' ? 700 : 500,
                color: activeTabRight === 'cases' ? '#0E7490' : '#64748B',
                cursor: 'pointer',
                borderRadius: '8px',
                padding: '6px 8px'
              }}
            >
              Precedents ({defaultSimilarCases.length})
            </button>
          </div>

          {activeTabRight === 'analysis' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <div style={{ padding: '10px 8px', background: '#FEF2F2', borderRadius: '12px', border: '1px solid #FCA5A5', textAlign: 'center' }}>
                  <div className="metadata-text" style={{ fontWeight: 600, color: '#B91C1C', fontSize: '10.5px' }}>Risk Index</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#B91C1C', marginTop: '2px' }}>{contract.riskScore || 81}</div>
                  <div style={{ fontSize: '10px', color: '#B91C1C', fontWeight: 600 }}>🛡 High Risk</div>
                </div>

                <div style={{ padding: '10px 8px', background: '#FFFBEB', borderRadius: '12px', border: '1px solid #FDE68A', textAlign: 'center' }}>
                  <div className="metadata-text" style={{ fontWeight: 600, color: '#B45309', fontSize: '10.5px' }}>DPDP Audit</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#B45309', marginTop: '2px' }}>{contract.complianceScore || 74}%</div>
                  <div style={{ fontSize: '10px', color: '#B45309', fontWeight: 600 }}>Action Needed</div>
                </div>

                <div style={{ padding: '10px 8px', background: '#FEFCE8', borderRadius: '12px', border: '1px solid #FEF08A', textAlign: 'center' }}>
                  <div className="metadata-text" style={{ fontWeight: 600, color: '#A07A3E', fontSize: '10.5px' }}>Confidence</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#A07A3E', marginTop: '2px' }}>{contract.confidenceScore || 98.4}%</div>
                  <div style={{ fontSize: '10px', color: '#A07A3E', fontWeight: 600 }}>✨ AI Verified</div>
                </div>
              </div>

              <div className="signature-accent-bar">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h4 className="label-text" style={{ fontSize: '13.5px' }}>
                    Executive Brief
                  </h4>
                  <span className="badge badge-gold" style={{ fontSize: '10px' }}>DPDP COMPLIANT</span>
                </div>
                <p className="body-text" style={{ fontSize: '13.5px', lineHeight: 1.6 }}>
                  {contract.executiveSummary || `Analysis of ${docTitle} completed. Section 12.4 mandates a 30-day notice window (violating CERT-In 6-hour rules and DPDP 2023 Section 8).`}
                </p>
              </div>

              {selectedItem && (
                <div 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '12px', 
                    padding: '16px', 
                    background: '#FEFCE8', 
                    borderRadius: '14px', 
                    border: '1.5px solid #FEF08A',
                    boxShadow: '0 4px 16px rgba(160, 122, 62, 0.08)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="label-text" style={{ fontSize: '13.5px', color: '#A07A3E', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Sparkles size={16} color="#A07A3E" /> ✨ Proposed DPDP Redline
                    </span>
                    <span className={`badge badge-${selectedItem.severity.toLowerCase()}`} style={{ fontSize: '10px' }}>{selectedItem.severity}</span>
                  </div>

                  <div>
                    <div className="metadata-text" style={{ fontWeight: 700, color: '#A07A3E', textTransform: 'uppercase', fontSize: '10.5px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Zap size={13} color="#A07A3E" /> Proposed Clause Text
                    </div>
                    <div style={{ padding: '12px', background: '#FFFFFF', borderRadius: '10px', border: '1px solid #FEF08A', fontSize: '13px', color: '#0F172A', fontFamily: 'JetBrains Mono, monospace', lineHeight: 1.55 }}>
                      "{selectedItem.recommendation}"
                    </div>
                  </div>

                  <div>
                    <div className="metadata-text" style={{ fontWeight: 600, color: '#64748B', textTransform: 'uppercase', fontSize: '10.5px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Scale size={13} color="#0E7490" /> Statutory Mandate Standard
                    </div>
                    <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '12.5px' }}>
                      {selectedItem.regulation}
                    </div>
                  </div>

                  <button 
                    className="btn btn-gold"
                    onClick={() => handleCopyText(selectedItem.recommendation, selectedItem.id)}
                    style={{ width: '100%', borderRadius: '10px', padding: '10px', fontSize: '13px' }}
                  >
                    {copiedId === selectedItem.id ? <Check size={14} /> : <Copy size={14} />}
                    {copiedId === selectedItem.id ? "Redline Copied!" : "One-Click Copy Redline"}
                  </button>
                </div>
              )}
            </>
          )}

          {activeTabRight === 'related' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="label-text" style={{ fontSize: '13px' }}>Indexed Portfolio Agreements</div>
              {defaultRelatedContracts.map((rel) => (
                <div key={rel.id} style={{ padding: '12px', borderRadius: '10px', background: '#F8F9FA', border: '1px solid #D6D3D1', borderLeft: '3px solid #0E7490' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{rel.title}</span>
                    <span className="badge badge-teal" style={{ fontSize: '10px' }}>{rel.similarity}</span>
                  </div>
                  <div className="metadata-text" style={{ fontSize: '11px' }}>Vendor: {rel.vendor} • Risk: {rel.risk}</div>
                </div>
              ))}
            </div>
          )}

          {activeTabRight === 'cases' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="label-text" style={{ fontSize: '13px' }}>High Court Precedent Rulings</div>
              {defaultSimilarCases.map((cas) => (
                <div key={cas.id} style={{ padding: '12px', borderRadius: '10px', background: '#F8F9FA', border: '1px solid #D6D3D1', borderLeft: '3px solid #15803D' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{cas.title}</span>
                    <span className="badge badge-success" style={{ fontSize: '10px' }}>{cas.relevance}</span>
                  </div>
                  <div className="body-text" style={{ fontSize: '12.5px' }}>
                    Precedent: {cas.precedent}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle, 
  Loader2, 
  FileCheck, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { processContractWithAI } from '../services/aiPipelineEngine';

export default function UploadView({ onUploadSuccess }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepMessage, setStepMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const processingSteps = [
    "OCR Agent: Ingesting document structure & page coordinates...",
    "NER Agent: Extracting contracting parties, ACV, jurisdiction & dates...",
    "Clause Agent: Segmenting clauses & calculating PDF bounding box coordinates...",
    "Risk Engine: Evaluating financial risk score & liability exposure matrix...",
    "Compliance Agent: Auditing GDPR, DPDP 2023, HIPAA & SOC2 controls...",
    "Recommendation Agent: Formulating precise clause redlines & rationale...",
    "Executive Summary Agent: Synthesizing board brief & top risk issues...",
    "Knowledge Graph Agent: Mapping relationships across Entities, Clauses & Laws..."
  ];

  const formatFileSize = (bytes) => {
    if (!bytes) return '2.4 MB';
    if (bytes >= 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
    return (bytes / 1024).toFixed(0) + ' KB';
  };

  const getFileTypeLabel = (fileName) => {
    if (!fileName) return 'PDF Document';
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'PDF Document';
    if (ext === 'docx' || ext === 'doc') return 'Word Document';
    return 'Legal Document';
  };

  const handleNativeFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile({
        name: file.name,
        size: formatFileSize(file.size),
        typeLabel: getFileTypeLabel(file.name),
        lastModified: file.lastModified ? new Date(file.lastModified).toLocaleDateString() : new Date().toLocaleDateString(),
        rawFile: file
      });
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile({
        name: file.name,
        size: formatFileSize(file.size),
        typeLabel: getFileTypeLabel(file.name),
        lastModified: file.lastModified ? new Date(file.lastModified).toLocaleDateString() : new Date().toLocaleDateString(),
        rawFile: file
      });
    }
  };

  const handleSampleSelect = (fileName, size = "2.4 MB") => {
    setSelectedFile({
      name: fileName,
      size: size,
      typeLabel: getFileTypeLabel(fileName),
      lastModified: new Date().toLocaleDateString(),
      rawFile: null
    });
  };

  const handleStartAnalysis = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setCurrentStep(0);

    try {
      const analyzedPayload = await processContractWithAI(selectedFile, (stepIdx, msg) => {
        setCurrentStep(stepIdx);
        setStepMessage(msg);
      });

      setIsProcessing(false);
      onUploadSuccess(analyzedPayload);
    } catch (err) {
      console.error("Pipeline analysis failed:", err);
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleNativeFileSelect}
        accept=".pdf,.doc,.docx"
        style={{ display: 'none' }}
      />

      {/* Header Bar */}
      <div className="page-header" style={{ marginBottom: 0 }}>
        <div className="signature-accent-bar">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0E7490', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <UploadCloud size={16} strokeWidth={2} /> Autonomous Ingestion Hub
          </div>
          <h1 className="page-title">Upload & Ingest Legal Document</h1>
          <p className="body-text" style={{ marginTop: '4px' }}>
            Select or drag and drop PDF, DOC, or DOCX agreements to inspect before running autonomous multi-agent analysis.
          </p>
        </div>
      </div>

      {/* Main Dropzone Card */}
      <div className="grid-12">
        <div 
          className="col-12 enterprise-panel"
          style={{
            padding: '48px 32px',
            textAlign: 'center',
            border: isDragging ? '2px dashed #0E7490' : '2px dashed #D6D3D1',
            background: isDragging ? '#E8F4F4' : '#FFFFFF',
            borderRadius: '18px'
          }}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {!selectedFile && !isProcessing && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
              <div 
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: '#E8F4F4',
                  color: '#0E7490',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-soft)'
                }}
              >
                <UploadCloud size={40} strokeWidth={1.75} />
              </div>

              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                  Drag & Drop Contract File Here
                </h3>
                <p style={{ fontSize: '14px', color: '#64748B' }}>
                  Supports <strong style={{ color: '#0F172A' }}>PDF</strong>, <strong style={{ color: '#0F172A' }}>DOCX</strong>, and <strong style={{ color: '#0F172A' }}>DOC</strong> formats
                </p>
              </div>

              <button 
                className="btn btn-primary"
                onClick={() => fileInputRef.current?.click()}
                style={{ padding: '12px 28px', fontSize: '14px', borderRadius: '12px' }}
              >
                <FileText size={18} strokeWidth={1.75} />
                Select File from Computer
              </button>

              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #D6D3D1', width: '100%', maxWidth: '640px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '16px' }}>
                  ⚡ Or select a sample contract preset to review before analysis
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => handleSampleSelect("AWS_Enterprise_Cloud_MSA.pdf", "2.4 MB")}>
                    📄 AWS Cloud MSA (High Risk)
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => handleSampleSelect("OmniAI_Data_Processing_DPA.docx", "1.1 MB")}>
                    📄 OmniAI DPA (GDPR Compliant)
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => handleSampleSelect("Healthcare_BAA_Agreement.pdf", "1.8 MB")}>
                    📄 MedTech BAA (HIPAA Issue)
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedFile && !isProcessing && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#E8F4F4', color: '#0E7490', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileCheck size={32} strokeWidth={1.75} />
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #D6D3D1', borderRadius: '14px', padding: '24px 32px', width: '100%', maxWidth: '520px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', wordBreak: 'break-all' }}>
                      📄 {selectedFile.name}
                    </h4>
                    <div style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
                      Size: {selectedFile.size} • Modified: {selectedFile.lastModified}
                    </div>
                  </div>
                  <span className="badge badge-teal">
                    ✓ {selectedFile.typeLabel}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <button 
                  className="btn btn-primary"
                  onClick={handleStartAnalysis}
                  style={{ height: '44px', padding: '0 28px', fontSize: '14px', borderRadius: '12px' }}
                >
                  <Sparkles size={18} strokeWidth={1.75} />
                  Analyze Contract
                </button>

                <button 
                  className="btn btn-secondary"
                  onClick={() => fileInputRef.current?.click()}
                  style={{ height: '44px', padding: '0 20px', fontSize: '14px', borderRadius: '12px' }}
                >
                  <RotateCcw size={16} strokeWidth={1.75} />
                  Choose Another File
                </button>
              </div>
            </div>
          )}

          {isProcessing && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
              <div style={{ position: 'relative' }}>
                <div 
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    border: '4px solid #F0ECE4',
                    borderTopColor: '#0E7490',
                    animation: 'spin 1s linear infinite'
                  }}
                />
              </div>

              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A' }}>
                  Autonomous AI Pipeline Active
                </h3>
                <p style={{ fontSize: '14px', color: '#0E7490', marginTop: '8px', fontWeight: 700 }}>
                  Analyzing: {selectedFile?.name}
                </p>
              </div>

              <div style={{ width: '100%', maxWidth: '620px', background: '#FFFFFF', borderRadius: '14px', padding: '24px', border: '1px solid #D6D3D1', textAlign: 'left' }}>
                {processingSteps.map((stepMsg, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '14px', 
                      padding: '10px 0',
                      color: idx < currentStep ? '#15803D' : idx === currentStep ? '#0E7490' : '#78716C',
                      fontSize: '13.5px',
                      fontWeight: idx === currentStep ? 700 : 500
                    }}
                  >
                    {idx < currentStep ? (
                      <CheckCircle size={18} color="#15803D" strokeWidth={1.75} style={{ flexShrink: 0 }} />
                    ) : idx === currentStep ? (
                      <Loader2 size={18} strokeWidth={1.75} style={{ animation: 'spin 1s linear infinite', flexShrink: 0 }} />
                    ) : (
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '1.5px solid #D6D3D1', flexShrink: 0 }} />
                    )}
                    <span>{idx === currentStep ? stepMessage || stepMsg : stepMsg}</span>
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>
      </div>

    </div>
  );
}

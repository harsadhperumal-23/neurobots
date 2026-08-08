import React, { useState } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Cpu,
  Bookmark
} from 'lucide-react';
import { queryRAGAssistant } from '../api/client';

export default function AiChatDrawer({ isOpen, onClose, contract }) {
  const docTitle = contract?.name || contract?.title || "Active_Contract.pdf";
  const contractId = contract?.id || "CTR-2026-0891";

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Namaste! I am your Enterprise Legal Copilot Assistant. I am grounded in **${docTitle}** across DPDP Act 2023, Companies Act 2013, CERT-In directions, and corporate ERM policies. How can I assist your legal review today?`,
      provider: 'Legal Copilot',
      model: 'Enterprise RAG Engine',
      citations: [
        { source: "DPDP Act 2023 §8(6)", statute: "Data Protection Board" },
        { source: "CERT-In Directions §4(a)", statute: "6-Hour Incident Notice" }
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  if (!isOpen) return null;

  const quickPrompts = [
    "Summarize DPDP 2023 compliance risks",
    "Explain Section 12.4 breach notice",
    "Is ₹5 Lakh liability cap compliant?",
    "Check CERT-In 6h reporting rules"
  ];

  const handleCopyText = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    setErrorMessage(null);
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    try {
      const ragRes = await queryRAGAssistant(text, contractId, docTitle);
      if (ragRes.success === false) {
        setErrorMessage(ragRes.error || ragRes.details || "AI Model Synthesis Error");
      } else {
        const aiMsg = {
          id: Date.now() + 1,
          sender: 'ai',
          text: ragRes.answer || "No response content returned.",
          provider: ragRes.provider || "Gemini",
          model: ragRes.model || "gemini-1.5-flash",
          citations: ragRes.citations || [],
          tokens: ragRes.tokens,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
      }
    } catch (err) {
      console.warn("RAG query error:", err);
      setErrorMessage(err.message || "Failed to query AI provider");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '440px',
        backgroundColor: '#FFFFFF',
        borderLeft: '1px solid #D6D3D1',
        boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.08)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        animation: 'fadeInSlide 200ms ease-out forwards'
      }}
    >
      {/* Header */}
      <div 
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid #D6D3D1',
          background: '#ECE8E1',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div 
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: '#0E7490',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Bot size={18} strokeWidth={1.75} />
          </div>

          <div>
            <div style={{ fontWeight: 800, fontSize: '15px', color: '#0F172A' }}>
              Legal Copilot AI Assistant
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
              Grounded in DPDP Act & Statutory Rules
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#64748B',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '6px'
          }}
          title="Close AI Assistant"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages List */}
      <div 
        style={{
          flex: 1,
          padding: '20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          backgroundColor: '#F7F5F1'
        }}
      >
        {messages.map((m) => (
          <div 
            key={m.id}
            style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '90%',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            {/* AI Provider & Model Badges */}
            {m.sender === 'ai' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', marginBottom: '2px' }}>
                <span className="badge badge-gold" style={{ fontSize: '9.5px', textTransform: 'uppercase' }}>
                  <Cpu size={10} style={{ marginRight: '3px' }} /> {m.provider || 'AI Provider'}
                </span>
                <span className="badge badge-teal" style={{ fontSize: '9.5px' }}>
                  {m.model || 'LLM Model'}
                </span>
              </div>
            )}

            <div 
              style={{
                padding: '14px 16px',
                borderRadius: m.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: m.sender === 'user' ? '#0E7490' : '#FFFFFF',
                color: m.sender === 'user' ? '#FFFFFF' : '#0F172A',
                border: m.sender === 'user' ? 'none' : '1px solid #D6D3D1',
                fontSize: '13.5px',
                lineHeight: 1.6,
                boxShadow: m.sender === 'user' ? '0 2px 8px rgba(14, 116, 144, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.03)',
                whiteSpace: 'pre-line'
              }}
            >
              {m.text}
            </div>

            {/* Citation Chips */}
            {m.citations && m.citations.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '2px' }}>
                {m.citations.map((c, cIdx) => (
                  <span key={cIdx} className="badge badge-info" style={{ fontSize: '9.5px', padding: '2px 8px' }}>
                    <Bookmark size={9} style={{ marginRight: '3px' }} /> {c.source}
                  </span>
                ))}
              </div>
            )}

            {/* Message Footer Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px', color: '#78716C', padding: '0 4px' }}>
              <span>{m.timestamp}</span>
              {m.sender === 'ai' && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleCopyText(m.id, m.text)}
                    style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                  >
                    {copiedId === m.id ? <Check size={12} color="#15803D" /> : <Copy size={12} />} Copy
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0E7490', fontSize: '12.5px', padding: '10px 14px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #D6D3D1' }}>
            <Sparkles size={14} className="pulse-dot" style={{ backgroundColor: '#0E7490' }} />
            <span>Copilot is querying LLM provider & synthesizing legal context...</span>
          </div>
        )}

        {errorMessage && (
          <div style={{ padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', color: '#991B1B', fontSize: '12.5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>⚠️ AI Provider Notice</strong>
              <div style={{ fontSize: '11.5px', marginTop: '2px' }}>{errorMessage}</div>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => handleSendMessage(messages[messages.length - 1]?.text)}>
              <RotateCcw size={12} /> Retry
            </button>
          </div>
        )}
      </div>

      {/* Quick Prompts Bar */}
      <div style={{ padding: '12px 20px', borderTop: '1px solid #D6D3D1', background: '#FFFFFF' }}>
        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
          Suggested Statutory Prompts:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              style={{
                padding: '5px 10px',
                fontSize: '11.5px',
                borderRadius: '8px',
                border: '1px solid #D6D3D1',
                background: '#F8F9FA',
                color: '#475569',
                cursor: 'pointer',
                transition: 'all 150ms ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0E7490'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#D6D3D1'}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
        style={{
          padding: '16px 20px',
          borderTop: '1px solid #D6D3D1',
          background: '#FFFFFF',
          display: 'flex',
          gap: '10px'
        }}
      >
        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask Copilot about Section 12.4, DPDP Act, or liability..."
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: '10px',
            border: '1px solid #D6D3D1',
            outline: 'none',
            fontSize: '13.5px',
            color: '#0F172A'
          }}
        />
        <button 
          type="submit"
          disabled={!inputText.trim()}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: '#0E7490',
            color: '#FFFFFF',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: inputText.trim() ? 'pointer' : 'not-allowed',
            opacity: inputText.trim() ? 1 : 0.5
          }}
        >
          <Send size={16} />
        </button>
      </form>

    </div>
  );
}

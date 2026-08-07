import React, { useState } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles
} from 'lucide-react';

export default function AiChatDrawer({ isOpen, onClose, contract }) {
  const docTitle = contract?.name || contract?.title || "Active_Contract.pdf";

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Namaste! I am your Legal Copilot Assistant. I have analyzed **${docTitle}** across DPDP Act 2023, Companies Act 2013, CERT-In directions, and corporate ERM policies. How can I assist your legal review today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    "Summarize DPDP 2023 compliance risks",
    "Explain Section 12.4 breach notice",
    "Is ₹5 Lakh liability cap compliant?",
    "Check CERT-In 6h reporting rules"
  ];

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = "";
      const lower = text.toLowerCase();

      if (lower.includes("risk") || lower.includes("summarize") || lower.includes("dpdp")) {
        aiResponseText = `Based on my analysis of **${docTitle}**, the top 3 statutory legal risk exposures are:\n\n1. **Section 12.4 (Critical)**: Mandates a 30-day incident notice window, violating **CERT-In 6-hour directions** and **DPDP Act §8(6)**.\n2. **Section 8.2 (High)**: Limits total aggregate liability to ₹5,00,000 on a ₹1.25 Cr ACV agreement.\n3. **Section 5.3 (High)**: Grants unrestricted cross-border data transfer rights without Indian DPA Section 16 safeguards.`;
      } else if (lower.includes("12.4") || lower.includes("breach") || lower.includes("notice") || lower.includes("cert")) {
        aiResponseText = `**Section 12.4 Statutory Analysis**:\nCurrently reads: *"Provider will notify Customer within 30 days of discovery."*\n\n**Regulatory Impact**: Violates **CERT-In 2022 Directions** (6-hour mandatory reporting) and **DPDP Act §8(6)** (up to ₹250 Cr statutory penalty exposure).\n\n**Recommended Redline**: Amend to 6 hours for CERT-In incidents and 72 hours for DPDP Data Fiduciary notice.`;
      } else if (lower.includes("liability") || lower.includes("cap") || lower.includes("5 lakh")) {
        aiResponseText = `**Section 8.2 Liability Cap Evaluation**:\nThe current ₹5,00,000 cap is non-compliant with Corporate ERM Policy §4.2. For a ₹1.25 Cr ACV contract, the baseline standard is **2x ACV (₹2,50,00,000)** with zero caps on data breaches or gross negligence under Companies Act Section 134.`;
      } else if (lower.includes("regulation") || lower.includes("violated") || lower.includes("jurisdiction")) {
        aiResponseText = `The agreement currently fails **2 statutory controls**:\n- **DPDP Act 2023 Section 8(6)**: Failed due to 30-day breach notice.\n- **CERT-In Directions 2022**: Failed due to non-compliant 6-hour incident window.`;
      } else {
        aiResponseText = `Regarding your query about **${docTitle}**: Section 12.4 (Breach Notice) and Section 8.2 (Liability Cap) represent the highest statutory risk areas requiring legal redlining before signing.`;
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 750);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '420px',
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
              width: '32px',
              height: '32px',
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
              DPDP & Statutory Grounded Q&A
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
          gap: '16px',
          backgroundColor: '#F7F5F1'
        }}
      >
        {messages.map((m) => (
          <div 
            key={m.id}
            style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
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

            <div 
              style={{
                fontSize: '10.5px',
                color: '#78716C',
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                padding: '0 4px'
              }}
            >
              {m.timestamp}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0E7490', fontSize: '12.5px', padding: '8px 12px' }}>
            <Sparkles size={14} className="pulse-dot" style={{ backgroundColor: '#0E7490' }} />
            <span>Copilot is indexing DPDP & High Court precedents...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts Bar */}
      <div style={{ padding: '12px 20px', borderTop: '1px solid #D6D3D1', background: '#FFFFFF' }}>
        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
          Suggested Legal Prompts:
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
          placeholder="Ask Copilot about DPDP Act, clauses, or laws..."
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

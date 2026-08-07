import React from 'react';
import { Bell, X, AlertTriangle, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

export default function NotificationModal({ isOpen, onClose, onNavigate }) {
  if (!isOpen) return null;

  const notifications = [
    { id: 1, title: 'GDPR Article 33 Violation Detected', desc: 'AWS Infrastructure MSA contains 30-day notice window instead of mandatory 72 hours.', time: '12m ago', unread: true, type: 'critical' },
    { id: 2, title: 'HIPAA Encryption Exception Flagged', desc: 'MedTech BAA contains unencrypted backup exception clause in Section 6.2.', time: '1h ago', unread: true, type: 'warning' },
    { id: 3, title: 'OmniAI DPA Verification Completed', desc: 'Zero retention guarantee validated with 98% compliance score.', time: '3h ago', unread: false, type: 'success' }
  ];

  return (
    <div 
      style={{
        position: 'fixed',
        top: 'calc(var(--topbar-height) + 8px)',
        right: '24px',
        width: '380px',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 90,
        overflow: 'hidden'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-tertiary)' }}>
        <div style={{ fontWeight: 700, fontSize: '13.5px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={16} color="var(--primary-blue)" /> Real-Time Regulatory Alerts
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <X size={16} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '6px' }}>
        {notifications.map((n) => (
          <div 
            key={n.id}
            onClick={() => {
              onNavigate('risk-analysis');
              onClose();
            }}
            style={{
              padding: '12px 14px',
              borderRadius: 'var(--radius-sm)',
              background: n.unread ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
              cursor: 'pointer'
            }}
            className="glass-card-interactive"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)' }}>{n.title}</div>
              <span style={{ fontSize: '10.5px', color: 'var(--text-subtle)' }}>{n.time}</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.3 }}>
              {n.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

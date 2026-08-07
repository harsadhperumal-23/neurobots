import React from 'react';
import { Settings, Shield, Lock, Bell, User, Key } from 'lucide-react';

export default function SettingsView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
      <div className="signature-accent-bar">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0E7490', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          <Settings size={16} strokeWidth={2} /> Platform Administration & Security
        </div>
        <h1 className="page-title">
          Enterprise Security & RBAC Settings
        </h1>
        <p className="body-text" style={{ marginTop: '4px' }}>
          Multi-tenant access control, zero-retention privacy policies, and API keys.
        </p>
      </div>

      <div className="grid-12">
        <div className="col-8 enterprise-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="signature-accent-bar">
            <h2 className="card-title">Organization Guardrails</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', borderRadius: '12px', background: '#F7F5F1', border: '1px solid #D6D3D1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#0F172A' }}>AES-256 Contract Storage Encryption</div>
                <div className="metadata-text" style={{ marginTop: '2px' }}>FIPS 140-2 compliant KMS keys</div>
              </div>
              <span className="badge badge-success">ACTIVE</span>
            </div>

            <div style={{ padding: '16px', borderRadius: '12px', background: '#F7F5F1', border: '1px solid #D6D3D1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#0F172A' }}>LLM Zero-Data Retention Policy</div>
                <div className="metadata-text" style={{ marginTop: '2px' }}>Customer contract payloads never train AI base models</div>
              </div>
              <span className="badge badge-teal">ENFORCED</span>
            </div>
          </div>
        </div>

        <div className="col-4 enterprise-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="signature-accent-bar">
            <h2 className="card-title">Role Assignment</h2>
          </div>
          <div style={{ fontSize: '13.5px', color: '#64748B' }}>
            User Role: <strong style={{ color: '#0F172A' }}>General Counsel (Admin)</strong><br />
            Organization: <strong style={{ color: '#0F172A' }}>Enterprise Fiduciary Corp</strong>
          </div>
          <button className="btn btn-primary" style={{ width: '100%', borderRadius: '10px' }}>
            Manage Users
          </button>
        </div>
      </div>
    </div>
  );
}

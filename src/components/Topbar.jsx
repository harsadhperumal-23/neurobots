import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  UploadCloud,
  Settings,
  Building2,
  ChevronDown,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function Topbar({ 
  theme, 
  setTheme, 
  onOpenUpload, 
  onOpenSearch, 
  onOpenNotifications, 
  unreadCount 
}) {
  const [selectedWorkspace, setSelectedWorkspace] = useState({
    name: "Kaveri Manufacturing Pvt. Ltd.",
    region: "Chennai Region (India Operations)"
  });
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);

  const workspaces = [
    { name: "Kaveri Manufacturing Pvt. Ltd.", region: "Chennai Region (India Operations)" },
    { name: "Vaigai Logistics Pvt. Ltd.", region: "Madurai Operations" },
    { name: "Cauvery Technologies", region: "Coimbatore R&D" },
    { name: "Velan Infrastructure", region: "Hosur Manufacturing Hub" },
    { name: "Sangam Healthcare Systems", region: "Chennai Health Tech" }
  ];

  return (
    <header 
      style={{
        height: '72px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #D6D3D1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        position: 'sticky',
        top: 0,
        zIndex: 30
      }}
    >
      {/* Brand & Scalable Enterprise Workspace Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '15px', color: '#0F172A', letterSpacing: '-0.01em' }}>
          <ShieldCheck size={20} color="#0E7490" strokeWidth={2} /> Compliance Copilot
        </div>

        <div style={{ height: '24px', width: '1px', background: '#D6D3D1' }} />

        {/* Organization Workspace Dropdown Selector */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#F7F5F1',
              border: '1px solid #D6D3D1',
              borderRadius: '10px',
              padding: '6px 14px',
              cursor: 'pointer',
              transition: 'all 150ms ease',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0E7490'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#D6D3D1'}
          >
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#0E7490', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={15} />
            </div>

            <div>
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A', lineHeight: 1.2, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>{selectedWorkspace.name}</span>
                <ChevronDown size={13} color="#64748B" />
              </div>
              <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 500 }}>
                {selectedWorkspace.region}
              </div>
            </div>
          </button>

          {/* Dropdown Options List */}
          {isWorkspaceOpen && (
            <div
              style={{
                position: 'absolute',
                top: '46px',
                left: 0,
                width: '320px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D6D3D1',
                borderRadius: '12px',
                boxShadow: '0 10px 28px rgba(0, 0, 0, 0.08)',
                zIndex: 50,
                padding: '8px 0',
                animation: 'fadeInSlide 150ms ease-out forwards'
              }}
            >
              <div style={{ padding: '8px 16px', fontSize: '10.5px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Select Organization Workspace
              </div>

              {workspaces.map((ws, i) => {
                const isSelected = selectedWorkspace.name === ws.name;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedWorkspace(ws);
                      setIsWorkspaceOpen(false);
                    }}
                    style={{
                      padding: '10px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      background: isSelected ? '#E8F4F4' : 'transparent',
                      transition: 'background 150ms ease'
                    }}
                    onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = '#F7F5F1'; }}
                    onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: isSelected ? 700 : 500, color: '#0F172A' }}>
                        {ws.name}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>
                        {ws.region}
                      </div>
                    </div>

                    {isSelected && <Check size={14} color="#0E7490" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Global Search Trigger Input */}
        <div 
          onClick={onOpenSearch}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#F7F5F1',
            border: '1px solid #D6D3D1',
            borderRadius: '10px',
            padding: '8px 12px',
            width: '260px',
            cursor: 'pointer',
            color: '#78716C',
            fontSize: '13px',
            transition: 'all 150ms ease'
          }}
        >
          <Search size={15} strokeWidth={1.75} color="#64748B" />
          <span style={{ flex: 1 }}>Search DPDP, clauses...</span>
          <kbd 
            style={{
              fontSize: '10.5px',
              fontWeight: 600,
              backgroundColor: '#FFFFFF',
              border: '1px solid #D6D3D1',
              borderRadius: '6px',
              padding: '2px 5px',
              color: '#64748B'
            }}
          >
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Action Controls (Zero Western Fake Employee Avatars) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        
        {/* + Upload Contract Primary Button */}
        <button 
          onClick={onOpenUpload}
          style={{
            height: '42px',
            padding: '0 18px',
            backgroundColor: '#0E7490',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '13.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(14, 116, 144, 0.2)',
            transition: 'all 150ms ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <UploadCloud size={16} strokeWidth={1.75} />
          <span>Upload Contract</span>
        </button>

        {/* Notifications Button */}
        <button
          onClick={onOpenNotifications}
          style={{
            width: '38px',
            height: '38px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #D6D3D1',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            color: '#64748B',
            transition: 'all 150ms ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E8F4F4'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
          title="Notifications"
        >
          <Bell size={17} strokeWidth={1.75} />
          {unreadCount > 0 && (
            <span 
              style={{
                position: 'absolute',
                top: '7px',
                right: '7px',
                width: '7px',
                height: '7px',
                backgroundColor: '#B91C1C',
                borderRadius: '50%'
              }}
            />
          )}
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          style={{
            width: '38px',
            height: '38px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #D6D3D1',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#64748B',
            transition: 'all 150ms ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E8F4F4'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={17} strokeWidth={1.75} /> : <Moon size={17} strokeWidth={1.75} />}
        </button>

        {/* Settings Button */}
        <button
          style={{
            width: '38px',
            height: '38px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #D6D3D1',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#64748B',
            transition: 'all 150ms ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E8F4F4'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
          title="Settings & Governance Controls"
        >
          <Settings size={17} strokeWidth={1.75} />
        </button>

      </div>
    </header>
  );
}

import React from 'react';
import { 
  Home, 
  Scroll, 
  UploadCloud, 
  Shield, 
  Scale, 
  Cpu, 
  Network, 
  BarChart3, 
  Briefcase, 
  Settings, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, badge: null },
  { id: 'contracts', label: 'Contracts', icon: Scroll, badge: '48' },
  { id: 'upload', label: 'Upload Contract', icon: UploadCloud, badge: null },
  { id: 'risk-analysis', label: 'Risk Analysis', icon: Shield, badge: '14' },
  { id: 'compliance', label: 'Compliance Center', icon: Scale, badge: '94%' },
  { id: 'agents', label: 'AI Pipeline', icon: Cpu, badge: '10' },
  { id: 'knowledge-graph', label: 'Knowledge Graph', icon: Network, badge: null },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
  { id: 'reports', label: 'Reports Brief', icon: Briefcase, badge: null },
  { id: 'settings', label: 'Settings', icon: Settings, badge: null },
];

export default function Sidebar({ activeTab, setActiveTab, collapsed, setCollapsed }) {
  return (
    <aside 
      style={{
        width: collapsed ? '76px' : 'var(--sidebar-width)',
        backgroundColor: '#ECE8E1',
        borderRight: '1px solid #D6D3D1',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        transition: 'width 150ms ease',
        flexShrink: 0
      }}
    >
      {/* Shortened Brand Header: "Copilot" */}
      <div 
        style={{
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          padding: collapsed ? '0' : '0 20px',
          borderBottom: '1px solid #D6D3D1'
        }}
      >
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div 
              style={{ 
                width: '28px', 
                height: '28px', 
                borderRadius: '8px', 
                background: '#0E7490', 
                color: '#FFFFFF', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: 800, 
                fontSize: '13px' 
              }}
            >
              CC
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '15px', color: '#0F172A', letterSpacing: '-0.01em' }}>
                Copilot
              </div>
              <div style={{ fontSize: '10.5px', color: '#0E7490', fontWeight: 700, letterSpacing: '0.02em' }}>
                Built in India. Ready for the world.
              </div>
            </div>
          </div>
        )}

        {collapsed && (
          <div 
            style={{ 
              width: '28px', 
              height: '28px', 
              borderRadius: '8px', 
              background: '#0E7490', 
              color: '#FFFFFF', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontWeight: 800, 
              fontSize: '13px' 
            }}
          >
            CC
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: '#FFFFFF',
            border: '1px solid #D6D3D1',
            color: '#64748B',
            borderRadius: '8px',
            width: '26px',
            height: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 150ms ease'
          }}
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Navigation List with Deep Teal (#0E7490) Selected Tint (#D6F0F0) & Left Indicator */}
      <nav style={{ flex: 1, padding: '20px 12px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: collapsed ? 'center' : 'space-between',
                  padding: collapsed ? '10px 0' : '10px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  borderLeft: isActive ? '3.5px solid #0E7490' : '3.5px solid transparent',
                  background: isActive ? '#D6F0F0' : 'transparent',
                  color: isActive ? '#0E7490' : '#475569',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 150ms ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = '#E8F4F4';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
                title={collapsed ? item.label : undefined}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon size={18} strokeWidth={isActive ? 2 : 1.75} color={isActive ? '#0E7490' : '#64748B'} />
                  {!collapsed && <span>{item.label}</span>}
                </div>

                {!collapsed && item.badge && (
                  <span 
                    style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      background: item.id === 'risk-analysis' ? '#FEF2F2' : '#F0ECE4',
                      color: item.id === 'risk-analysis' ? '#B91C1C' : '#475569',
                      fontWeight: 700
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Sidebar Footer */}
      {!collapsed && (
        <div 
          style={{
            padding: '16px',
            borderTop: '1px solid #D6D3D1',
            background: '#ECE8E1'
          }}
        >
          <div style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5 }}>
            <strong style={{ color: '#0F172A' }}>1,482 Agreements Indexed</strong><br />
            10 Micro-Agents Active
          </div>
        </div>
      )}
    </aside>
  );
}

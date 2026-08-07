import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import DashboardView from './components/DashboardView';
import ContractsView from './components/ContractsView';
import UploadView from './components/UploadView';
import ContractAnalysisView from './components/ContractAnalysisView';
import RiskAnalysisView from './components/RiskAnalysisView';
import ComplianceCenterView from './components/ComplianceCenterView';
import AiAgentsView from './components/AiAgentsView';
import KnowledgeGraphView from './components/KnowledgeGraphView';
import AnalyticsView from './components/AnalyticsView';
import ReportsView from './components/ReportsView';
import SettingsView from './components/SettingsView';

import GlobalSearchModal from './components/GlobalSearchModal';
import NotificationModal from './components/NotificationModal';

import { 
  INITIAL_STATS, 
  RECENT_CONTRACTS, 
  RISKS_LIST, 
  COMPLIANCE_FRAMEWORKS, 
  AI_AGENTS, 
  KNOWLEDGE_GRAPH_DATA, 
  RECENT_ACTIVITY_TIMELINE 
} from './mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeDocument, setActiveDocument] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState('dark');

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  // Apply dark/light theme attribute to root
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Global keyboard shortcut for Cmd+K / Ctrl+K
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (tab, docData = null) => {
    if (docData) {
      setActiveDocument(docData);
    }
    setActiveTab(tab);
  };

  const handleUploadSuccess = (uploadedFileData) => {
    setActiveDocument(uploadedFileData);
    setActiveTab('analysis');
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView 
            stats={INITIAL_STATS} 
            recentContracts={RECENT_CONTRACTS} 
            timeline={RECENT_ACTIVITY_TIMELINE} 
            onNavigate={handleNavigate} 
          />
        );
      case 'contracts':
        return (
          <ContractsView 
            recentContracts={RECENT_CONTRACTS} 
            onNavigate={handleNavigate} 
          />
        );
      case 'upload':
        return (
          <UploadView 
            onUploadSuccess={handleUploadSuccess} 
            onNavigate={handleNavigate} 
          />
        );
      case 'analysis':
        return (
          <ContractAnalysisView 
            contract={activeDocument} 
            onNavigate={handleNavigate} 
          />
        );
      case 'risk-analysis':
        return (
          <RiskAnalysisView 
            risksList={RISKS_LIST} 
            onNavigate={handleNavigate} 
          />
        );
      case 'compliance':
        return (
          <ComplianceCenterView 
            frameworks={COMPLIANCE_FRAMEWORKS} 
            onNavigate={handleNavigate} 
          />
        );
      case 'agents':
        return (
          <AiAgentsView 
            agentsList={AI_AGENTS} 
          />
        );
      case 'knowledge-graph':
        return (
          <KnowledgeGraphView 
            graphData={KNOWLEDGE_GRAPH_DATA}
            activeContract={activeDocument} 
            onNavigate={handleNavigate} 
          />
        );
      case 'analytics':
        return <AnalyticsView />;
      case 'reports':
        return (
          <ReportsView 
            stats={INITIAL_STATS} 
            recentContracts={RECENT_CONTRACTS} 
          />
        );
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <DashboardView 
            stats={INITIAL_STATS} 
            recentContracts={RECENT_CONTRACTS} 
            timeline={RECENT_ACTIVITY_TIMELINE} 
            onNavigate={handleNavigate} 
          />
        );
    }
  };

  return (
    <div className="app-container">
      {/* Collapsible Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => handleNavigate(tab)} 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
      />

      {/* Main Wrapper */}
      <div className="main-wrapper">
        {/* Topbar */}
        <Topbar 
          theme={theme} 
          setTheme={setTheme} 
          onOpenUpload={() => handleNavigate('upload')} 
          onOpenSearch={() => setIsSearchOpen(true)} 
          onOpenNotifications={() => {
            setIsNotificationsOpen(!isNotificationsOpen);
            setUnreadCount(0);
          }} 
          unreadCount={unreadCount} 
        />

        {/* Viewport Content */}
        <main className="main-content">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Modals */}
      <GlobalSearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        recentContracts={RECENT_CONTRACTS} 
        onNavigate={handleNavigate} 
      />

      <NotificationModal 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
        onNavigate={handleNavigate} 
      />
    </div>
  );
}

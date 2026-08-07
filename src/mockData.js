// Compliance Copilot Mock Data Repository
// Built in India. Ready for the world.

export const INITIAL_STATS = {
  totalContracts: 1482,
  contractsGrowth: "+14.2% vs last month",
  complianceScore: 94.2,
  complianceDelta: "+3.5% this quarter",
  highRiskContracts: 14,
  highRiskUrgent: 3,
  recommendationsCount: 8920,
  recommendationAccuracy: 98.4,
  activeAgents: 10,
  agentAvgTime: "4.2s"
};

export const RECENT_CONTRACTS = [
  {
    id: "CTR-2026-0891",
    title: "Enterprise Manufacturing Supply & Cloud MSA",
    vendor: "Cauvery Technologies Pvt. Ltd.",
    type: "Manufacturing Supply Agreement (MSA)",
    uploadDate: "2026-08-06",
    status: "Flagged",
    riskLevel: "High",
    complianceScore: 74,
    effectiveDate: "2026-09-01",
    expirationDate: "2029-08-31",
    value: "₹1,25,00,000 / yr",
    governingLaw: "High Court of Judicature at Madras (Chennai)",
    flaggedIssuesCount: 5,
    frameworks: ["DPDP 2023", "Companies Act 2013", "CERT-In", "ISO27001"],
    highlights: [
      { id: "h1", text: "8.2 Liability Cap: In no event shall Provider's total aggregate liability exceed ₹5,00,000 for any and all claims.", severity: "High", issue: "Unbalanced liability cap compared to ₹1.25 Cr annual contract value." },
      { id: "h2", text: "12.4 Security Incident Notice: Customer will be notified of data security incidents within 30 days of discovery.", severity: "Critical", issue: "Violates DPDP Act 2023 mandatory breach notice and CERT-In 6-hour reporting mandate." },
      { id: "h3", text: "14.1 Governing Jurisdiction: Any dispute arising out of this agreement shall be submitted to binding arbitration in London under ICC rules.", severity: "Medium", issue: "Differs from High Court of Judicature at Madras (Chennai Bench) jurisdiction preference." },
      { id: "h4", text: "5.3 Cross-Border Data Transfer: Customer grants unrestricted right to transfer personal data across international borders.", severity: "High", issue: "Non-compliant with DPDP Section 16 cross-border transfer rules and EU SCC safeguards." }
    ]
  },
  {
    id: "CTR-2026-0888",
    title: "Enterprise Data Processing Addendum (DPA) - AI Platform",
    vendor: "Chennai Digital Solutions Ltd.",
    type: "Data Processing Addendum (DPA)",
    uploadDate: "2026-08-05",
    status: "Verified",
    riskLevel: "Low",
    complianceScore: 98,
    effectiveDate: "2026-08-01",
    expirationDate: "2027-07-31",
    value: "₹48,60,000 / yr",
    governingLaw: "Madras High Court (Madurai Bench)",
    flaggedIssuesCount: 1,
    frameworks: ["DPDP 2023", "IT Act 2000", "GDPR", "SOC2"],
    highlights: [
      { id: "h5", text: "3.1 Zero Data Retention Guarantee: Provider agrees that zero Customer confidential data or Indian PII will be used to fine-tune public LLMs.", severity: "Low", issue: "Standard compliant clause under DPDP 2023 §6." }
    ]
  },
  {
    id: "CTR-2026-0872",
    title: "Healthcare Provider Business Associate & Data Security Agreement",
    vendor: "Sangam Healthcare Systems Pvt. Ltd.",
    type: "Business Associate Agreement (BAA)",
    uploadDate: "2026-08-03",
    status: "Under Review",
    riskLevel: "Medium",
    complianceScore: 86,
    effectiveDate: "2026-07-15",
    expirationDate: "2028-07-14",
    value: "₹82,00,000 / yr",
    governingLaw: "High Court of Judicature at Madras (Chennai)",
    flaggedIssuesCount: 3,
    frameworks: ["DPDP 2023", "HIPAA", "ISO27001"],
    highlights: [
      { id: "h6", text: "6.2 Patient Data Storage: Provider may store patient health records on unencrypted backup drives during scheduled server migration windows.", severity: "High", issue: "Direct breach of DPDP 2023 Data Fiduciary safeguards and HIPAA Security Rules." }
    ]
  },
  {
    id: "CTR-2026-0850",
    title: "Logistics Infrastructure Vendor Agreement & Fleet Tech License",
    vendor: "Vaigai Logistics & Freight Services Pvt. Ltd.",
    type: "Vendor Logistics Agreement",
    uploadDate: "2026-07-29",
    status: "Auto-Remediated",
    riskLevel: "Low",
    complianceScore: 95,
    effectiveDate: "2026-08-01",
    expirationDate: "2027-07-31",
    value: "₹2,10,00,000 / yr",
    governingLaw: "High Court of Judicature at Madras (Chennai)",
    flaggedIssuesCount: 0,
    frameworks: ["Companies Act 2013", "ISO27001", "SOC2"],
    highlights: []
  },
  {
    id: "CTR-2026-0841",
    title: "Cyber Incident Monitoring & CERT-In Compliance SLA",
    vendor: "Marudham Cyber Defense Systems Ltd.",
    type: "Service Level Agreement (SLA)",
    uploadDate: "2026-07-24",
    status: "Flagged",
    riskLevel: "Critical",
    complianceScore: 62,
    effectiveDate: "2026-08-10",
    expirationDate: "2029-08-09",
    value: "₹65,00,000 / yr",
    governingLaw: "NCLT Chennai Bench",
    flaggedIssuesCount: 7,
    frameworks: ["CERT-In", "SEBI LODR", "SOC2", "ISO27001"],
    highlights: [
      { id: "h7", text: "4.1 SOC Uptime Guarantee: 98.0% Uptime for Security Operations Center with no financial remedies for downtime.", severity: "Critical", issue: "Industry standard requirement is 99.99% uptime with 6-hour CERT-In breach reporting window." }
    ]
  }
];

export const RISKS_LIST = [
  {
    id: "RSK-901",
    contractId: "CTR-2026-0891",
    contractTitle: "Enterprise Manufacturing Supply & Cloud MSA",
    vendor: "Cauvery Technologies Pvt. Ltd.",
    severity: "Critical",
    clauseName: "Section 12.4 - Security Incident Notification Window",
    currentText: "Customer will be notified of data security incidents within 30 days of discovery.",
    suggestedFix: "Customer shall be notified in writing without undue delay, and in any event within 6 hours for CERT-In mandates and 72 hours for DPDP 2023, after Provider becomes aware of a Security Incident.",
    reason: "Current clause violates CERT-In 6-hour Cyber Incident Mandates and India DPDP Act 2023 Section 8(6) breach reporting rules.",
    regulation: "CERT-In Directions 2022 / DPDP Act 2023 §8",
    confidence: 99.1,
    impact: "Statutory fine up to ₹250 Crore under DPDP Act 2023 Section 33.",
    category: "Data Privacy & CERT-In Compliance",
    status: "Open"
  },
  {
    id: "RSK-902",
    contractId: "CTR-2026-0891",
    contractTitle: "Enterprise Manufacturing Supply & Cloud MSA",
    vendor: "Cauvery Technologies Pvt. Ltd.",
    severity: "High",
    clauseName: "Section 8.2 - Aggregate Liability Limitation",
    currentText: "In no event shall Provider's total aggregate liability exceed ₹5,00,000 for any and all claims.",
    suggestedFix: "Provider's aggregate liability shall be capped at 2x the annual contract value (₹2,50,00,000), provided that liabilities arising from gross negligence, willful misconduct, or data privacy breaches shall be un-capped.",
    reason: "A ₹5 Lakh liability limit on a ₹1.25 Cr annual contract creates severe balance sheet risk exposure for manufacturing data outages.",
    regulation: "Corporate Governance & Board ERM Policy §4.2",
    confidence: 96.5,
    impact: "Unmitigated financial balance sheet loss during supplier downtime.",
    category: "Liability & Indemnification",
    status: "Open"
  },
  {
    id: "RSK-903",
    contractId: "CTR-2026-0872",
    contractTitle: "Healthcare Provider Business Associate & Data Security Agreement",
    vendor: "Sangam Healthcare Systems Pvt. Ltd.",
    severity: "High",
    clauseName: "Section 6.2 - Health Data Backup Unencrypted Storage",
    currentText: "Provider may store patient health records on unencrypted backup drives during scheduled server migration windows.",
    suggestedFix: "Provider shall encrypt all Digital Personal Data and Health Information both at rest and in transit using AES-256 encryption at all times, without exception.",
    reason: "Unencrypted storage of health PII violates DPDP Act 2023 Data Fiduciary duties and HIPAA Security Rule 45 CFR § 164.312.",
    regulation: "DPDP Act 2023 §8 / HIPAA §164.312",
    confidence: 98.8,
    impact: "Regulatory sanctions and Data Protection Board penalties.",
    category: "Health Data Protection",
    status: "In Remediation"
  },
  {
    id: "RSK-904",
    contractId: "CTR-2026-0841",
    contractTitle: "Cyber Incident Monitoring & CERT-In Compliance SLA",
    vendor: "Marudham Cyber Defense Systems Ltd.",
    severity: "Critical",
    clauseName: "Section 4.1 - Uptime Commitment & Exclusions",
    currentText: "98.0% Uptime for Security Operations Center with no financial remedies for downtime.",
    suggestedFix: "99.99% Uptime guarantee with tier-1 service credits applied for any downtime exceeding 5 minutes per calendar month, integrated with automated CERT-In 6-hour reporting.",
    reason: "SOC monitoring at 98% allows over 14 hours of unmonitored security gaps per month, breaching SEBI LODR Clause 33 & SOC 2 CC6.1 controls.",
    regulation: "SEBI LODR Guidelines / CERT-In Mandates",
    confidence: 95.7,
    impact: "Undetected cyber intrusions during downtime windows.",
    category: "Service Availability & Cyber Security",
    status: "Open"
  },
  {
    id: "RSK-905",
    contractId: "CTR-2026-0891",
    contractTitle: "Enterprise Manufacturing Supply & Cloud MSA",
    vendor: "Cauvery Technologies Pvt. Ltd.",
    severity: "Medium",
    clauseName: "Section 5.3 - Cross-Border Data Transfer Approval",
    currentText: "Customer grants unrestricted right to transfer personal data across international borders.",
    suggestedFix: "Transfers of Personal Data outside India shall strictly comply with notifications issued by the Central Government under DPDP Act 2023 Section 16 and valid Standard Contractual Clauses (SCCs).",
    reason: "Unrestricted data transfer violates Indian Central Government DPDP Section 16 notifications and EU SCC safeguards.",
    regulation: "DPDP Act 2023 §16 / EU SCCs Module 2",
    confidence: 94.2,
    impact: "Government order to halt international data processing.",
    category: "Cross-Border Transfer",
    status: "Pending Legal Review"
  }
];

export const COMPLIANCE_FRAMEWORKS = [
  {
    id: "DPDP",
    name: "DPDP Act 2023 (India Privacy Law)",
    score: 96,
    totalRules: 32,
    compliantRules: 31,
    nonCompliantRules: 1,
    icon: "Shield",
    color: "#0E7490",
    description: "Digital Personal Data Protection Act, 2023 statutory compliance framework.",
    items: [
      { id: "dpdp-1", rule: "Section 8(6) - Data Fiduciary Breach Reporting", status: "Warning", explanation: "Requires prompt notification to Data Protection Board of India and affected Data Principals.", action: "Execute automated redline addendum for Cauvery Tech MSA & Marudham Cyber SLAs." },
      { id: "dpdp-2", rule: "Section 9 - Processing of Children's Data", status: "Compliant", explanation: "Verified zero processing of minor data across examined corporate agreements.", action: "Pass." },
      { id: "dpdp-3", rule: "Section 6 - Consent & Purpose Limitation", status: "Compliant", explanation: "Contractual purpose limitations strictly bounded in DPAs.", action: "Pass." },
      { id: "dpdp-4", rule: "Section 16 - Cross-Border Data Transfer Limits", status: "Warning", explanation: "Cauvery Tech MSA lacks explicit Central Government notification clause.", action: "Attach Indian DPA Addendum." }
    ]
  },
  {
    id: "COMPANIES_ACT",
    name: "Companies Act 2013 (MCA Statutory Rules)",
    score: 94,
    totalRules: 45,
    compliantRules: 42,
    nonCompliantRules: 3,
    icon: "Building",
    color: "#8C6A3B",
    description: "Ministry of Corporate Affairs governance, Board approvals, and Related Party disclosures.",
    items: [
      { id: "mca-1", rule: "Section 188 - Related Party Transactions Approval", status: "Compliant", explanation: "All supplier transactions over ₹1 Cr approved by Audit Committee.", action: "Verified active." },
      { id: "mca-2", rule: "Section 134(5) - Directors Responsibility Safeguards", status: "Compliant", explanation: "Internal financial controls and contract compliance clauses verified.", action: "Pass." }
    ]
  },
  {
    id: "CERT_IN",
    name: "CERT-In 6-Hour Cyber Directions 2022",
    score: 91,
    totalRules: 20,
    compliantRules: 18,
    nonCompliantRules: 2,
    icon: "AlertTriangle",
    color: "#B45309",
    description: "Mandatory 6-hour incident reporting to Indian Computer Emergency Response Team.",
    items: [
      { id: "cert-1", rule: "6-Hour Incident Notice Requirement", status: "Warning", explanation: "Marudham SLA specifies 24-hour notice instead of statutory 6-hour CERT-In rule.", action: "Issue mandatory 6h incident amendment." }
    ]
  },
  {
    id: "SEBI_LODR",
    name: "SEBI (LODR) Regulations 2015",
    score: 95,
    totalRules: 38,
    compliantRules: 36,
    nonCompliantRules: 2,
    icon: "BarChart3",
    color: "#2F6B55",
    description: "Securities & Exchange Board of India Listing Obligations & Disclosure Requirements.",
    items: [
      { id: "sebi-1", rule: "Regulation 30 - Material Contract Disclosure", status: "Compliant", explanation: "Material agreements over 2% turnover disclosed to stock exchanges.", action: "Pass." }
    ]
  },
  {
    id: "ISO27001",
    name: "ISO/IEC 27001:2022 (Global InfoSec)",
    score: 95,
    totalRules: 93,
    compliantRules: 88,
    nonCompliantRules: 5,
    icon: "FileCheck",
    color: "#15803D",
    description: "Information security management system control validation.",
    items: [
      { id: "iso-1", rule: "A.5.19 - Information Security in Supplier Relationships", status: "Compliant", explanation: "Supplier infosec requirements embedded in all active contracts.", action: "Verified." }
    ]
  },
  {
    id: "GDPR",
    name: "GDPR (EU General Data Protection)",
    score: 92,
    totalRules: 48,
    compliantRules: 44,
    nonCompliantRules: 4,
    icon: "Shield",
    color: "#0E7490",
    description: "EU Regulation 2016/679 for international cross-border agreements.",
    items: [
      { id: "gdpr-1", rule: "Article 33 - 72h Data Breach Notification", status: "Warning", explanation: "2 active vendor MSAs specify 30-day notification instead of 72 hours.", action: "Attach EU SCC Addendum." }
    ]
  }
];

export const AI_AGENTS = [
  {
    id: "agent-1",
    name: "Document Ingestion Agent",
    role: "Parser & Pre-processor",
    type: "Ingestion Engine",
    status: "Idle",
    progress: 100,
    execTime: "0.4s",
    model: "DocVision-v4",
    description: "Normalizes PDF/DOCX files, converts layout elements, extracts embedded metadata.",
    tasksCompleted: 1482,
    accuracy: 99.8
  },
  {
    id: "agent-2",
    name: "OCR & Structural Parser Agent",
    role: "Visual OCR & Chunking",
    type: "Visual Parsing",
    status: "Idle",
    progress: 100,
    execTime: "0.8s",
    model: "PaddleOCR-Enterprise",
    description: "Performs optical character recognition on scanned Indian agreements and breaks document into semantic trees.",
    tasksCompleted: 1482,
    accuracy: 99.4
  },
  {
    id: "agent-3",
    name: "Clause Extraction Agent",
    role: "Legal Classifier",
    type: "NLP Synthesizer",
    status: "Idle",
    progress: 100,
    execTime: "0.6s",
    model: "LegalBERT-v3",
    description: "Identifies and categorizes standard legal clauses (Indemnification, Liability, DPDP Breach Window, Jurisdiction).",
    tasksCompleted: 12450,
    accuracy: 98.9
  },
  {
    id: "agent-4",
    name: "NER (Named Entity) Agent",
    role: "Entity Recognition",
    type: "Entity Extractor",
    status: "Idle",
    progress: 100,
    execTime: "0.3s",
    model: "SpaCy-LegalNER",
    description: "Extracts dates, Indian Rupee monetary amounts (Cr/Lakh), party names, and High Court jurisdictions.",
    tasksCompleted: 48900,
    accuracy: 99.2
  },
  {
    id: "agent-5",
    name: "Risk Detection Agent",
    role: "Risk Classifier",
    type: "Heuristic Risk Evaluator",
    status: "Idle",
    progress: 100,
    execTime: "0.9s",
    model: "Claude-3.5-Sonnet",
    description: "Compares contract terms against corporate baseline risk policies and flags hazardous terms.",
    tasksCompleted: 8920,
    accuracy: 97.8
  },
  {
    id: "agent-6",
    name: "Compliance Validation Agent",
    role: "Regulatory Checker",
    type: "Rule Evaluator",
    status: "Idle",
    progress: 100,
    execTime: "0.5s",
    model: "GPT-4o-Legal",
    description: "Cross-validates contract provisions against DPDP Act 2023, Companies Act 2013, CERT-In, SEBI & GDPR.",
    tasksCompleted: 1482,
    accuracy: 99.1
  },
  {
    id: "agent-7",
    name: "RAG Retrieval Agent",
    role: "Context Finder",
    type: "Vector Search",
    status: "Idle",
    progress: 100,
    execTime: "0.2s",
    model: "Milvus-DenseRetriever",
    description: "Queries enterprise legal repository for precedent contracts and Indian High Court case law.",
    tasksCompleted: 15400,
    accuracy: 99.6
  },
  {
    id: "agent-8",
    name: "Recommendation & Redlining Agent",
    role: "Auto-Redliner",
    type: "Generative Drafter",
    status: "Idle",
    progress: 100,
    execTime: "0.7s",
    model: "GPT-4o-Legal-Drafter",
    description: "Generates legal-grade replacement wording to neutralize identified contract risks.",
    tasksCompleted: 4120,
    accuracy: 96.9
  },
  {
    id: "agent-9",
    name: "Audit & Provenance Agent",
    role: "Traceability Logger",
    type: "Immutable Logger",
    status: "Idle",
    progress: 100,
    execTime: "0.1s",
    model: "ChainAudit-v2",
    description: "Records step-by-step AI reasoning chains for complete regulatory explainability.",
    tasksCompleted: 1482,
    accuracy: 100
  },
  {
    id: "agent-10",
    name: "Final Report Generation Agent",
    role: "Executive Reporter",
    type: "Document Synthesizer",
    status: "Idle",
    progress: 100,
    execTime: "0.4s",
    model: "PdfReport-Engine",
    description: "Compiles complete legal audit report with risk scorecards, heatmaps, and mitigation steps.",
    tasksCompleted: 1482,
    accuracy: 99.9
  }
];

export const KNOWLEDGE_GRAPH_DATA = {
  nodes: [
    { id: "N-1", label: "Kaveri Manufacturing Pvt. Ltd.", type: "Company", color: "#0E7490", val: 30, desc: "Primary Contracting Enterprise (Chennai)" },
    { id: "N-2", label: "Cauvery Technologies Pvt. Ltd.", type: "Vendor", color: "#0E7490", val: 24, desc: "Cloud & Tech Services Vendor (Coimbatore)" },
    { id: "N-3", label: "Chennai Digital Solutions Ltd.", type: "Vendor", color: "#0E7490", val: 22, desc: "AI Infrastructure Provider (Chennai)" },
    { id: "N-4", label: "CTR-2026-0891 (Supply MSA)", type: "Contract", color: "#64748B", val: 20, desc: "Manufacturing Supply Agreement" },
    { id: "N-5", label: "CTR-2026-0888 (AI DPA)", type: "Contract", color: "#64748B", val: 18, desc: "Data Processing Addendum" },
    { id: "N-6", label: "Section 12.4 Breach Notice", type: "Clause", color: "#B45309", val: 15, desc: "30-Day Notification Provision" },
    { id: "N-7", label: "Section 8.2 Liability Cap", type: "Clause", color: "#B45309", val: 15, desc: "₹5 Lakh Liability Limit Clause" },
    { id: "N-8", label: "DPDP Act 2023 Section 8", type: "Regulation", color: "#15803D", val: 18, desc: "Indian Data Fiduciary Statutory Rule" },
    { id: "N-9", label: "CERT-In 6h Incident Mandate", type: "Regulation", color: "#15803D", val: 18, desc: "Cyber Emergency Response Regulation" },
    { id: "N-10", label: "Uncapped Balance Sheet Risk", type: "Risk", color: "#B91C1C", val: 16, desc: "High financial loss risk" },
    { id: "N-11", label: "Mandatory Board Disclosure", type: "Obligation", color: "#0E7490", val: 14, desc: "Companies Act 2013 requirement" }
  ],
  links: [
    { source: "N-1", target: "N-4", label: "Party To" },
    { source: "N-1", target: "N-5", label: "Party To" },
    { source: "N-2", target: "N-4", label: "Vendor For" },
    { source: "N-3", target: "N-5", label: "Vendor For" },
    { source: "N-4", target: "N-6", label: "Contains Clause" },
    { source: "N-4", target: "N-7", label: "Contains Clause" },
    { source: "N-6", target: "N-8", label: "Violates" },
    { source: "N-6", target: "N-9", label: "Violates" },
    { source: "N-7", target: "N-10", label: "Triggers Risk" },
    { source: "N-8", target: "N-11", label: "Enforces" }
  ]
};

export const RECENT_ACTIVITY_TIMELINE = [
  { id: 1, time: "10 mins ago", title: "Automated DPDP Redline Generated", desc: "Recommendation Agent drafted 6h/72h breach notice clause for Cauvery Tech MSA.", type: "ai", icon: "Bot" },
  { id: 2, time: "42 mins ago", title: "Contract Analysis Completed", desc: "CTR-2026-0888 (Chennai Digital DPA) parsed with 98% DPDP compliance score.", type: "success", icon: "CheckCircle" },
  { id: 3, time: "2 hours ago", title: "High Risk Violation Flagged", desc: "Unencrypted health data backup clause detected in Sangam Healthcare BAA.", type: "warning", icon: "AlertTriangle" },
  { id: 4, time: "4 hours ago", title: "New Document Uploaded", desc: "Vaigai Logistics Vendor Agreement uploaded by Legal Ops Admin.", type: "upload", icon: "FileText" },
  { id: 5, time: "Yesterday", title: "Board Audit Brief Exported", desc: "Q3 Statutory Compliance Report downloaded for Board of Directors.", type: "report", icon: "Download" }
];

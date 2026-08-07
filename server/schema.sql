-- Compliance Copilot — Enterprise Production Database Schema
-- PostgreSQL 16+ with pgvector extension for RAG and Clause Embeddings

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 1. Organizations (Multi-Tenancy)
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    subscription_plan VARCHAR(50) DEFAULT 'enterprise',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users (RBAC)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'legal_counsel', -- 'owner', 'admin', 'legal_counsel', 'auditor'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Contracts
CREATE TABLE contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    uploaded_by_user_id UUID REFERENCES users(id),
    title VARCHAR(500) NOT NULL,
    original_filename VARCHAR(500) NOT NULL,
    file_mime_type VARCHAR(100) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    storage_s3_key VARCHAR(1000) NOT NULL,
    version_label VARCHAR(50) DEFAULT 'v1.0',
    status VARCHAR(50) DEFAULT 'analyzed', -- 'uploading', 'processing', 'analyzed', 'failed'
    overall_risk_score INT CHECK (overall_risk_score BETWEEN 0 AND 100),
    overall_risk_level VARCHAR(20) DEFAULT 'High', -- 'Critical', 'High', 'Medium', 'Low'
    overall_compliance_score INT CHECK (overall_compliance_score BETWEEN 0 AND 100),
    confidence_score NUMERIC(5,2) DEFAULT 98.40,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Clauses (With PDF Coordinates & Vector Embeddings)
CREATE TABLE clauses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    section_number VARCHAR(100),
    clause_title VARCHAR(255) NOT NULL,
    clause_type VARCHAR(100) NOT NULL, -- 'Liability Cap', 'Breach Notice', 'Data Transfer', 'Jurisdiction', etc.
    raw_text TEXT NOT NULL,
    page_number INT NOT NULL,
    bounding_box JSONB, -- { x: percentage, y: percentage, width: percentage, height: percentage }
    severity VARCHAR(20) NOT NULL, -- 'Critical', 'High', 'Medium', 'Low'
    embedding vector(1536), -- OpenAI / Azure vector embedding for RAG similarity search
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Entities (NER Output)
CREATE TABLE entities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    entity_type VARCHAR(100) NOT NULL, -- 'Organization', 'Person', 'Money', 'Date', 'Jurisdiction', 'Regulation'
    entity_value VARCHAR(500) NOT NULL,
    page_number INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Risks (Risk Engine Evaluation)
CREATE TABLE risks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    clause_id UUID REFERENCES clauses(id) ON DELETE SET NULL,
    severity VARCHAR(20) NOT NULL,
    category VARCHAR(100) NOT NULL,
    issue_description TEXT NOT NULL,
    violating_regulation VARCHAR(255),
    financial_impact TEXT,
    confidence_score NUMERIC(5,2),
    status VARCHAR(50) DEFAULT 'flagged', -- 'flagged', 'remediated', 'accepted'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Compliance Checks (GDPR, DPDP, HIPAA, SOC2, ISO27001)
CREATE TABLE compliance_checks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    framework_id VARCHAR(50) NOT NULL, -- 'GDPR', 'DPDP', 'HIPAA', 'SOC2', 'ISO27001'
    framework_name VARCHAR(255) NOT NULL,
    rule_id VARCHAR(100) NOT NULL,
    rule_description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL, -- 'Compliant', 'Non-Compliant', 'Action Needed'
    audit_findings TEXT NOT NULL,
    suggested_action TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Recommendations (AI Redlines)
CREATE TABLE recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    clause_id UUID REFERENCES clauses(id) ON DELETE CASCADE,
    suggested_redline_text TEXT NOT NULL,
    legal_rationale TEXT NOT NULL,
    risk_reduction_pct INT CHECK (risk_reduction_pct BETWEEN 0 AND 100),
    referenced_law VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'accepted', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. AI Agent Execution Logs (LangGraph Trace provenance)
CREATE TABLE ai_executions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    agent_name VARCHAR(100) NOT NULL,
    execution_status VARCHAR(50) NOT NULL,
    execution_time_ms INT NOT NULL,
    token_usage JSONB,
    log_output TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Audit Logs (Enterprise Access Control Provenance)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id UUID,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Fast Vector Search & Performance
CREATE INDEX idx_clauses_embedding ON clauses USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
CREATE INDEX idx_contracts_org_status ON contracts (organization_id, status);
CREATE INDEX idx_clauses_contract_id ON clauses (contract_id);
CREATE INDEX idx_risks_contract_id ON risks (contract_id);
CREATE INDEX idx_compliance_contract_id ON compliance_checks (contract_id);

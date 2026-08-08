/**
 * Compliance Copilot Enterprise API & WebSocket Client
 * Built in India. Ready for the world.
 */

const API_BASE_URL = "http://localhost:8000/api/v1";
const WS_BASE_URL = "ws://localhost:8000/api/v1";

export async function uploadContractFile(file, clientId = "global") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("client_id", clientId);

  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
    throw new Error(`Upload failed: ${res.statusText}`);
  }
  return await res.json();
}

export async function fetchContracts() {
  const res = await fetch(`${API_BASE_URL}/contracts`);
  if (!res.ok) throw new Error("Failed to fetch contracts.");
  return await res.json();
}

export async function fetchContractDetails(contractId) {
  const res = await fetch(`${API_BASE_URL}/contracts/${contractId}`);
  if (!res.ok) throw new Error(`Failed to fetch contract ${contractId}`);
  return await res.json();
}

export async function fetchJobStatus(jobId) {
  const res = await fetch(`${API_BASE_URL}/jobs/${jobId}`);
  if (!res.ok) throw new Error(`Failed to fetch job ${jobId}`);
  return await res.json();
}

export async function fetchDashboardStats() {
  const res = await fetch(`${API_BASE_URL}/dashboard/stats`);
  if (!res.ok) throw new Error("Failed to fetch dashboard stats.");
  return await res.json();
}

export async function fetchComplianceMatrix() {
  const res = await fetch(`${API_BASE_URL}/compliance/matrix`);
  if (!res.ok) throw new Error("Failed to fetch compliance matrix.");
  return await res.json();
}

export async function fetchKnowledgeGraphNodes() {
  const res = await fetch(`${API_BASE_URL}/knowledge-graph/nodes`);
  if (!res.ok) throw new Error("Failed to fetch knowledge graph nodes.");
  return await res.json();
}

export async function queryRAGAssistant(query, contractId, contractTitle) {
  const res = await fetch(`${API_BASE_URL}/rag/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question: query,
      query: query,
      contract_id: contractId,
      contract_title: contractTitle
    })
  });

  const data = await res.json();
  if (!res.ok && !data.error && !data.details) {
    throw new Error(`RAG query failed (${res.status}): ${res.statusText}`);
  }
  return data;
}

export function getReportDownloadUrl(contractId, format = "pdf") {
  return `${API_BASE_URL}/reports/${contractId}/${format}`;
}

export function connectWebSocket(clientId = "global", onEventCallback) {
  try {
    const ws = new WebSocket(`${WS_BASE_URL}/ws/${clientId}`);

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (onEventCallback) onEventCallback(payload);
      } catch (err) {
        console.warn("WebSocket parse error:", err);
      }
    };

    ws.onerror = (err) => {
      console.warn("WebSocket connection error:", err);
    };

    return ws;
  } catch (err) {
    console.warn("Could not establish WebSocket connection:", err);
    return null;
  }
}

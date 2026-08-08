from fastapi import APIRouter

router = APIRouter()

@router.get("/knowledge-graph/nodes")
async def get_knowledge_graph_nodes():
    return {
        "nodes": [
            {"id": "N-1", "label": "Kaveri Manufacturing Pvt. Ltd.", "type": "Company", "color": "#0E7490", "val": 30, "desc": "Primary Enterprise (Chennai HQ)"},
            {"id": "N-2", "label": "Cauvery Technologies Pvt. Ltd.", "type": "Vendor", "color": "#0E7490", "val": 24, "desc": "IT Infrastructure Vendor"},
            {"id": "N-3", "label": "Enterprise MSA - Cloud & Services", "type": "Contract", "color": "#64748B", "val": 20, "desc": "Master Services Agreement"},
            {"id": "N-4", "label": "Sec 12.4 Breach Notice (30 Days)", "type": "Clause", "color": "#B45309", "val": 15, "desc": "30-Day Notice Provision"},
            {"id": "N-5", "label": "Sec 8.2 Liability Cap (₹5 Lakh)", "type": "Clause", "color": "#B45309", "val": 15, "desc": "₹5 Lakh Cap"},
            {"id": "N-6", "label": "DPDP Act 2023 Section 8(6)", "type": "Regulation", "color": "#15803D", "val": 18, "desc": "Data Fiduciary Mandatory Breach Rule"},
            {"id": "N-7", "label": "CERT-In 6-Hour Incident Mandate", "type": "Regulation", "color": "#15803D", "val": 18, "desc": "6-Hour Incident Notice Requirement"},
            {"id": "N-8", "label": "₹250 Crore Penalty Exposure", "type": "Risk", "color": "#B91C1C", "val": 16, "desc": "Statutory fine exposure under DPDP §33"}
        ],
        "links": [
            {"source": "N-1", "target": "N-3", "label": "Party To"},
            {"source": "N-2", "target": "N-3", "label": "Vendor For"},
            {"source": "N-3", "target": "N-4", "label": "Contains Clause"},
            {"source": "N-3", "target": "N-5", "label": "Contains Clause"},
            {"source": "N-4", "target": "N-6", "label": "Violates"},
            {"source": "N-4", "target": "N-7", "label": "Violates"},
            {"source": "N-4", "target": "N-8", "label": "Triggers Risk"}
        ]
    }

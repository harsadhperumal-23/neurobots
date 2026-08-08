from fastapi import APIRouter, Response
from agents.reports.exporter import ReportExportAgent

router = APIRouter()
exporter = ReportExportAgent()

sample_contract_data = {
    "title": "Enterprise Manufacturing Supply & Cloud MSA",
    "vendor": "Cauvery Technologies Pvt. Ltd.",
    "type": "Manufacturing Supply Agreement (MSA)",
    "value": "₹1,25,00,000 / yr",
    "governingLaw": "High Court of Judicature at Madras",
    "riskScore": 81,
    "complianceScore": 74,
    "executiveSummary": "Analysis completed. Section 12.4 mandates a 30-day incident notice window, violating CERT-In 6-hour directions and India DPDP Act 2023 Section 8."
}

@router.get("/reports/{contract_id}/json")
async def export_json_report(contract_id: str):
    data = dict(sample_contract_data)
    data["contract_id"] = contract_id
    return exporter.generate_structured_json(data)

@router.get("/reports/{contract_id}/pdf")
async def export_pdf_report(contract_id: str):
    data = dict(sample_contract_data)
    data["contract_id"] = contract_id
    pdf_bytes = exporter.generate_pdf_bytes(data)
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=Executive_Audit_Report_{contract_id}.pdf"}
    )

@router.get("/reports/{contract_id}/docx")
async def export_docx_report(contract_id: str):
    data = dict(sample_contract_data)
    data["contract_id"] = contract_id
    docx_bytes = exporter.generate_docx_bytes(data)
    return Response(
        content=docx_bytes,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        headers={"Content-Disposition": f"attachment; filename=Executive_Audit_Report_{contract_id}.docx"}
    )

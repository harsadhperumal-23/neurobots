from fastapi import APIRouter

router = APIRouter()

@router.get("/compliance/matrix")
async def get_compliance_matrix():
    return [
        {
            "id": "DPDP_2023",
            "title": "Digital Personal Data Protection (DPDP) Act 2023",
            "statute": "DPDP Act 2023 §8(6) & §16",
            "compliancePct": 88,
            "status": "Action Needed",
            "findingsCount": 3,
            "keyFinding": "Section 12.4 mandates 30-day incident notice instead of immediate statutory reporting to DPB.",
            "recommendation": "Adopt automated 72-hour DPDP compliance addendum."
        },
        {
            "id": "CERT_IN_2022",
            "title": "CERT-In 6-Hour Cyber Incident Directions 2022",
            "statute": "CERT-In Directions §4(a)",
            "compliancePct": 72,
            "status": "Non-Compliant",
            "findingsCount": 5,
            "keyFinding": "Absence of 6-hour cyber security incident escalation SLA.",
            "recommendation": "Execute CERT-In 6-Hour Incident Notification rider."
        },
        {
            "id": "COMPANIES_ACT_2013",
            "title": "Companies Act 2013 (Internal Financial Controls)",
            "statute": "Companies Act 2013 §134(5)",
            "compliancePct": 94,
            "status": "Compliant",
            "findingsCount": 1,
            "keyFinding": "Aggregate liability limit aligns with board risk policy threshold.",
            "recommendation": "Maintain annual board audit review."
        },
        {
            "id": "SEBI_LODR",
            "title": "SEBI (LODR) Listing Obligations Regulations 2015",
            "statute": "Regulation 30",
            "compliancePct": 98,
            "status": "Compliant",
            "findingsCount": 0,
            "keyFinding": "Material contract disclosure terms fully compliant.",
            "recommendation": "Pass."
        },
        {
            "id": "ISO_27001",
            "title": "ISO/IEC 27001:2022 InfoSec Standard",
            "statute": "Annex A.5.19",
            "compliancePct": 92,
            "status": "Compliant",
            "findingsCount": 1,
            "keyFinding": "Supplier infosec controls verified.",
            "recommendation": "Pass."
        }
    ]

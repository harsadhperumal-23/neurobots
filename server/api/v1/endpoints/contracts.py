import logging
from typing import List, Dict, Any
from fastapi import APIRouter, HTTPException

logger = logging.getLogger("compliance_copilot.api.contracts")

router = APIRouter()

@router.get("/contracts")
async def list_contracts():
    return [
        {
            "id": "CTR-2026-0891",
            "title": "Enterprise Manufacturing Supply & Cloud MSA",
            "vendor": "Cauvery Technologies Pvt. Ltd.",
            "type": "Manufacturing Supply Agreement (MSA)",
            "uploadDate": "2026-08-06",
            "status": "Flagged",
            "riskLevel": "High",
            "complianceScore": 74,
            "effectiveDate": "2026-09-01",
            "expirationDate": "2029-08-31",
            "value": "₹1,25,00,000 / yr",
            "governingLaw": "High Court of Judicature at Madras (Chennai)",
            "flaggedIssuesCount": 5
        },
        {
            "id": "CTR-2026-0888",
            "title": "Enterprise Data Processing Addendum (DPA) - AI Platform",
            "vendor": "Chennai Digital Solutions Ltd.",
            "type": "Data Processing Addendum (DPA)",
            "uploadDate": "2026-08-05",
            "status": "Verified",
            "riskLevel": "Low",
            "complianceScore": 98,
            "effectiveDate": "2026-08-01",
            "expirationDate": "2027-07-31",
            "value": "₹48,60,000 / yr",
            "governingLaw": "Madras High Court (Madurai Bench)",
            "flaggedIssuesCount": 1
        }
    ]

@router.get("/contracts/{contract_id}")
async def get_contract_details(contract_id: str):
    return {
        "id": contract_id,
        "title": "Enterprise Manufacturing Supply & Cloud MSA",
        "vendor": "Cauvery Technologies Pvt. Ltd.",
        "type": "Manufacturing Supply Agreement (MSA)",
        "value": "₹1,25,00,000 / yr",
        "governingLaw": "High Court of Judicature at Madras (Chennai Bench)",
        "riskScore": 81,
        "complianceScore": 74,
        "executiveSummary": "Analysis completed. Section 12.4 violates CERT-In 6h directions and DPDP Act §8.",
        "version": "v1.0"
    }

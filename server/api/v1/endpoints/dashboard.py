from fastapi import APIRouter

router = APIRouter()

@router.get("/dashboard/stats")
async def get_dashboard_stats():
    return {
        "totalContracts": 128,
        "highRiskCount": 14,
        "averageComplianceScore": 86,
        "activeAuditsCount": 9,
        "monthlyExposureRupees": "₹4.85 Crore",
        "riskDistribution": [
            {"level": "Critical Exposure", "count": 6, "color": "#B91C1C"},
            {"level": "High Exposure", "count": 14, "color": "#E11D48"},
            {"level": "Medium Risk", "count": 38, "color": "#D97706"},
            {"level": "Low Exposure", "color": "#16A34A", "count": 70}
        ],
        "complianceFrameworks": [
            {"id": "DPDP", "name": "DPDP Act 2023", "score": 88, "status": "Passing"},
            {"id": "COMPANIES_ACT", "name": "Companies Act 2013", "score": 94, "status": "Compliant"},
            {"id": "CERT_IN", "name": "CERT-In 6-Hour Directions", "score": 72, "status": "Action Required"},
            {"id": "SEBI_LODR", "name": "SEBI (LODR) 2015", "score": 98, "status": "Compliant"},
            {"id": "ISO27001", "name": "ISO/IEC 27001:2022", "score": 92, "status": "Compliant"}
        ],
        "vendorRankings": [
            {"name": "Cauvery Technologies Pvt. Ltd.", "risk": "High Exposure", "score": 74, "acv": "₹1.25 Cr"},
            {"name": "Chennai Digital Solutions Ltd.", "risk": "Low Exposure", "score": 98, "acv": "₹48.6 Lakh"},
            {"name": "Kongu Logistics & Supply Chain", "risk": "Medium Risk", "score": 84, "acv": "₹85.0 Lakh"}
        ]
    }

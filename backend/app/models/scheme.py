from dataclasses import dataclass
from typing import Optional


@dataclass
class SchemeEligibility:
    scheme_slug: str
    applicant_age: int
    annual_income: float
    state: str
    purpose: str
    eligible: bool
    match_percentage: Optional[int] = None

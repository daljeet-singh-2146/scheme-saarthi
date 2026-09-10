def build_scheme_guidance(scheme: dict, match_percentage: int) -> dict:
    """Prepare concise guidance that can be used by a future scheme assistant."""
    return {
        "scheme": scheme.get("name"),
        "match_percentage": match_percentage,
        "guidance": (
            f"{scheme.get('name', 'This scheme')} has a {match_percentage}% "
            "match for the applicant profile. Review the eligibility criteria "
            "and required documents before applying."
        ),
    }


def summarize_application(profile: dict, scheme: dict) -> str:
    purpose = profile.get("purpose", "selected purpose")
    state = profile.get("state", "selected state")
    return (
        f"The application is being considered for {scheme.get('name', 'the selected scheme')} "
        f"for {purpose} in {state}. Verify the latest official eligibility and lending terms."
    )

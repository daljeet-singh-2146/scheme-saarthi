from pathlib import Path
import json


DATA_FILE = Path(__file__).resolve().parents[2] / ".." / ".." / "data" / "nsfdc_credit_products" / "schemes.json"


def load_scheme_data() -> list[dict]:
    with DATA_FILE.resolve().open("r", encoding="utf-8") as file:
        return json.load(file)


def find_schemes(purpose: str | None = None) -> list[dict]:
    schemes = load_scheme_data()
    if not purpose:
        return schemes

    normalized = purpose.lower()
    matches = []
    for scheme in schemes:
        searchable = " ".join(
            str(scheme.get(key, "")) for key in ("name", "tagline", "description", "purpose", "category")
        ).lower()
        if normalized in searchable:
            matches.append(scheme)

    return matches or schemes

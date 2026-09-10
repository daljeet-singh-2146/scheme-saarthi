from fastapi import APIRouter, HTTPException
from pathlib import Path
import json

router = APIRouter(prefix="/api/schemes", tags=["Schemes"])

DATA_FILE = Path(__file__).resolve().parents[3] / "data" / "nsfdc_credit_products" / "schemes.json"


def load_schemes():
    with DATA_FILE.open("r", encoding="utf-8") as file:
        return json.load(file)


@router.get("")
def list_schemes():
    return load_schemes()


@router.get("/{slug}")
def get_scheme(slug: str):
    schemes = load_schemes()
    for scheme in schemes:
        if scheme.get("slug") == slug:
            return scheme
    raise HTTPException(status_code=404, detail="Scheme not found")

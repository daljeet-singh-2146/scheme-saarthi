from fastapi import FastAPI
from app.api.schemes import router as schemes_router

app = FastAPI(
    title="SchemeSaarthi",
    description="Scheme discovery and eligibility services",
    version="1.0.0",
)


@app.get("/")
def root():
    return {"message": "SchemeSaarthi services", "status": "running"}


@app.get("/api/health")
def health():
    return {"status": "ok"}


app.include_router(schemes_router)

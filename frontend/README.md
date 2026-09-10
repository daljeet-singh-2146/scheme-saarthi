# SchemeSaarthi

SchemeSaarthi a web-based platform that helps Scheduled Caste (SC) beneficiaries discover and understand NSFDC-style concessional credit products routed through authorized Channel Partners.

## Run the frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend scaffold

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Structure

- `frontend/` — existing React/Vite application
- `backend/` — independent FastAPI scaffold for future integration
- `data/` — future NSFDC data
- `docs/` — architecture documentation
- `assets/` — project assets
- `submission/` — presentation/demo video
# SchemeSaarthi Architecture

```text
SchemeSaarthi/
│
├── frontend/                 # Existing React/Vite application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                  # Independent backend scaffold
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── services/
│   │   ├── ai/
│   │   └── main.py
│   └── requirements.txt
│
├── data/
│   └── nsfdc_credit_products/
│
├── docs/
│   └── architecture.md
│
├── assets/
│   └── screenshots/
│
├── submission/
│   ├── PRESENTATION.md
│   └── DEMO.md
│
├── README.md
├── .gitignore
└── LICENSE
```

## Current integration status

The frontend is unchanged and remains fully independent. The backend is a basic FastAPI scaffold for scheme-service development and does not interfere with the current application.

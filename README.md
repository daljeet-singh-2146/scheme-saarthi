# SchemeSaarthi
**SchemeSaarthi**, a web-based platform that helps Scheduled Caste (SC) beneficiaries discover and understand NSFDC-style concessional credit products routed through authorized Channel Partners.
SchemeSaarthi matches eligible SC entrepreneurs and students to the right credit product using a guided **Find My Scheme** questionnaire, explains loan terms in plain language, and directs them to the appropriate Channel Partner to apply.

Live Link: https://scheme-saarthi-silk.vercel.app

## 1. Project Information
- **Project Title:** SchemeSaarthi – AI-Driven Concessional Credit Matching for SC Entrepreneurs
- **PS ID:** SIH26092
- **PS Title:** AI-Driven Scheme Matching for Marginalized Entrepreneurs
- **Category:** Software
- **Theme:** Smart Automation
- **Ministry:** Ministry of Social Justice and Empowerment

## 2. Problem Statement
Scheduled Caste entrepreneurs and students eligible for NSFDC concessional credit often struggle to identify which credit product suits their needs, understand the eligibility criteria (SC category, annual family income ≤ ₹5,00,000), and locate the correct Channel Partner — State Channelizing Agencies (SCAs), Public Sector Banks (PSBs), Regional Rural Banks (RRBs), or NBFC-MFIs — through whom loans are actually disbursed. The result is low awareness and poor uptake of credit lines specifically designed for their economic empowerment.

## 3. Proposed Solution
**SchemeSaarthi** is a web platform that matches eligible SC beneficiaries to one of three NSFDC concessional credit products:

| # | Credit Product | Purpose | Loan Ceiling | Interest Rate | Moratorium |
|---|----------------|---------|-------------|---------------|------------|
| 1 | **Micro Finance Scheme** | Small projects (micro enterprises, street vending, artisan work) | Up to ₹1,40,000 | ~6.5% | 3–6 months |
| 2 | **Term Loan Scheme** | Larger projects (manufacturing, services, trading units) | Up to ₹50,00,000 | 6.5–10% | 6–12 months |
| 3 | **Educational Loan Scheme** | Higher education for SC students | Need-based | 6.5–15% | Course period + 6–12 months |

**Key aspects of the channel-finance model:**
- Loans are **not disbursed directly** by NSFDC. They are routed through Channel Partners: SCAs, PSBs, RRBs, and NBFC-MFIs.
- The platform collects the beneficiary's profile (category, income, goal, location) and recommends the best-fit credit product.
- It then directs the user to the appropriate Channel Partner to begin the formal application.

## 4. Key Features
- AI-Powered Credit-Product Recommendation Engine matched to SC beneficiary profiles
- Find My Scheme guided questionnaire (goal, income, category, location)
- Clear comparison of loan ceilings, interest rates, moratorium periods, and collateral requirements
- Channel Partner directory — locate your nearest SCA, PSB branch, RRB, or NBFC-MFI
- EMI Calculator for concessional interest rates (6.5%–15%)
- Application Tracking Dashboard
- Multilingual Support — Available in English and Hindi
- AI-Based Conversational Assistant

## 5. Tech Stack
- Frontend: React + Typescript, Tailwind CSS
- Backend: Python + FastAPI
- Machine Learning: Python, Scikit-learn, RAG
- Database: PostgreSQL, ChromaDB
- Deployment: AWS, Render
- Product Data: NSFDC guidelines, SCA databases

## 6. Architecture
```text
             User (SC Beneficiary)
                      │
                      ▼
        React + TypeScript Frontend
                      │
                  REST API
                      │
                      ▼
              FastAPI Backend
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
 AI Credit-Product Matching    AI Assistant (RAG)
          │                       │
          └───────────┬───────────┘
                      ▼
       NSFDC Credit Products Database
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
      PostgreSQL            Vector Database
                      │
                      ▼
    Personalized Credit Recommendations
           + Channel Partner Info
```

## 7. Repository Structure
```text
SchemeSaarthi/
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── services/
│   │   ├── ai/
│   │   └── main.py
│   │
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
└── .gitignore
```

## 8. Presentation and Demo Video
Presentation: https://docs.google.com/presentation/d/1ppQI5ZgEsnZVgHOZce4p-jtt03jjbWyY/edit?usp=sharing&ouid=102188742768616598730&rtpof=true&sd=true

Video: https://drive.google.com/file/d/1l2ni_eq7pJf2Z24grq2Wo4Zzz5FNiY8T/view?usp=sharing

## Run
Locally:
1. git clone https://github.com/daljeet-singh-2146/scheme-saarthi.git
2. cd scheme-saarthi/
3. npm install
4. npm run dev

## Future Scope
- Expand coverage to other NSFDC verticals and credit products as they are introduced.
- Integrate with State Channelizing Agency (SCA) portals for real-time application status tracking.
- Support additional SC/ST welfare corporation products from state-level bodies.
- Adding other regional languages for broader accessibility.
- AI-Powered Assistant: An intelligent conversational assistant to help SC beneficiaries understand credit products, eligibility, required documents, and the channel-partner application process in simple language.

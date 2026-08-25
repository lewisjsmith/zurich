# Insurance Application — Developer Stable Release

A fullstack insurance qualification application built with React (TypeScript) on the frontend and Node.js/Express (TypeScript) on the backend.

---

## Overview

This application allows a user to select an insurance policy type and complete a qualification form. The submitted data is evaluated against a set of underwriting rules on the server, which returns one of three decisions:

- **QUALIFY** — the applicant meets standard underwriting criteria and may proceed to quote
- **REFER** — one or more answers require further review by an underwriter
- **DECLINE** — the applicant does not meet the minimum eligibility criteria

Currently supported policy types:
- **Life Insurance** (Term, Whole of Life, Decreasing Term)

---

## Project Structure

    /
    ├── client/                              # React frontend (Vite + TypeScript)
    │   └── src/
    │       ├── components/
    │       │   ├── PolicySelector.tsx             # Policy type selector
    │       │   ├── UnderwriterPanel.tsx           # Underwriter review tab
    │       │   ├── AllApplicationsPanel.tsx       # All applications view tab
    │       │   ├── ApplicationStatusPage.tsx      # Public status page (/status/:id)
    │       │   └── forms/
    │       │       └── LifeInsuranceForm/
    │       │           ├── index.tsx              # Form orchestrator and result screen
    │       │           ├── schema.ts              # Zod validation schema
    │       │           └── sections/
    │       │               ├── PersonalDetails.tsx
    │       │               ├── CoverDetails.tsx
    │       │               ├── MedicalHistory.tsx
    │       │               ├── LifestyleDetails.tsx
    │       │               ├── OccupationAndHobbies.tsx
    │       │               └── ExistingCover.tsx
    │       ├── types/
    │       │   └── insurance.ts                   # Shared frontend types
    │       ├── App.tsx
    │       └── main.tsx
    │
    └── server/                              # Express backend (TypeScript)
        └── src/
            ├── routes/
            │   └── applications.ts          # REST API routes
            ├── services/
            │   └── qualificationEngine.ts   # Underwriting rules LIF-01 to LIF-10
            ├── store/
            │   ├── applicationStore.ts      # In-memory repository
            │   └── seed.ts                  # Optional dummy data seed
            ├── types/
            │   └── insurance.ts             # Shared backend types
            └── index.ts                     # Server entry point

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install dependencies

Server: `cd server && npm install`

Client: `cd client && npm install`

### Run in development

Server: `cd server && npm run dev`

The server runs on http://localhost:3001.

Client: `cd client && npm run dev`

The client runs on http://localhost:5173 and proxies `/api` requests to the server automatically.

---

## Application Tabs

The application has three tabs:

### 1. Apply
The customer-facing form. Select a policy type, complete all sections, and submit. The form requires two presses of the submit button — the first press shows a confirmation prompt, the second submits the application. On submission the decision result and a full summary of submitted data are displayed.

### 2. Underwriter Review
Shows all applications with a current decision of REFER. Each application is displayed as an expandable card with:
- **Flagged answers** surfaced at the top (any Yes answers with supporting detail)
- Full application details grouped by section beneath
- **Accept**, **Deny**, and **Rate** action buttons, each with a confirmation step before committing
  - Accept → updates decision to QUALIFY
  - Deny → updates decision to DECLINE
  - Rate → applies a percentage loading (0–100%) and updates decision to QUALIFY
- Cards can be minimised to show only the applicant name, decision badge, and an "Action required" note

### 3. All Applications
A read-only table of all applications in the store. Clicking any row navigates to that application's status page at `/status/:id`.

---

## Application Status Page

Each application has a public-facing status page accessible at:

    http://localhost:5173/status/:id

This page displays:
- Decision outcome with appropriate messaging (Approved / Under Review / Unsuccessful)
- Applicant details, policy type, submission date, and application ID
- Underwriting notes
- A **Download PDF** button that generates a full application summary PDF client-side, including all submitted form data grouped by section and the decision outcome

---

## Seed Data

The server is seeded with dummy applications on startup by default. To disable seeding, comment out the `seedStore()` call in `server/src/index.ts`.

### Seeded application IDs

| Decision | Applicant | ID |
|---|---|---|
| QUALIFY | Jane Smith | `11111111-1111-1111-1111-111111111111` |
| REFER | Robert Jones | `22222222-2222-2222-2222-222222222222` |
| REFER | Margaret Clarke | `44444444-4444-4444-4444-444444444444` |
| DECLINE | Alex Taylor | `33333333-3333-3333-3333-333333333333` |

### Example curl commands

Fetch a seeded application status:

    curl http://localhost:3001/api/applications/11111111-1111-1111-1111-111111111111/status

Fetch full application record:

    curl http://localhost:3001/api/applications/11111111-1111-1111-1111-111111111111

Submit a new application:

    curl -X POST http://localhost:3001/api/applications \
      -H "Content-Type: application/json" \
      -d '{"policyType":"life","firstName":"Test","lastName":"User","email":"test@example.com","dateOfBirth":"1990-01-01","nationalInsuranceNumber":"a1b2c3d4-e5f6-7890-abcd-ef1234567890","ukPermanentResident":true,"coverType":"term","coverAmount":200000,"coverTermYears":20,"reasonForCover":"Family protection","hasPreExistingConditions":false,"hasMedication":false,"hasSurgeries":false,"hasFamilyHistory":false,"smokingStatus":"never","usesVapingOrNicotine":false,"alcoholUnitsPerWeek":4,"usesRecreationalDrugs":false,"jobTitle":"Accountant","industry":"Finance","hasHazardousHobbies":false,"hasExistingCover":false}'

Update an application decision (underwriter action):

    curl -X PATCH http://localhost:3001/api/applications/22222222-2222-2222-2222-222222222222 \
      -H "Content-Type: application/json" \
      -d '{"decision":"QUALIFY","rate":25}'

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/applications` | List all applications |
| `POST` | `/api/applications` | Submit a new application |
| `GET` | `/api/applications/:id` | Fetch full application record by ID |
| `GET` | `/api/applications/:id/status` | Fetch application status summary by ID |
| `PATCH` | `/api/applications/:id` | Update application decision and/or rate |

---

## Underwriting Rules

The qualification engine evaluates submitted data against the following rules:

| Rule | Condition | Decision |
|---|---|---|
| LIF-01 | UK permanent residency | QUALIFY / DECLINE |
| LIF-02 | Age within product limits (18–70) | QUALIFY / REFER / DECLINE |
| LIF-03 | Cover amount and term within limits | QUALIFY |
| LIF-04 | Unusually high cover or long term | REFER |
| LIF-05 | Medical history disclosed | REFER |
| LIF-06 | Smoking, vaping, alcohol, or drug use outside thresholds | REFER |
| LIF-07 | Hazardous hobbies disclosed | REFER |
| LIF-08 | Existing cover creates possible over-insurance | REFER |
| LIF-09 | Required answer refused | REFER / DECLINE |
| LIF-10 | Material misrepresentation identified | REFER |

---

## Form Sections

| Section | Fields |
|---|---|
| Personal Details | First name, last name, email, date of birth, NI number (UUID), UK residency |
| Cover Details | Cover type, benefit amount, term, linked liability (decreasing only), reason for cover |
| Medical History | Pre-existing conditions, medication, surgeries, family history |
| Lifestyle | Smoking status, vaping/nicotine use, alcohol units per week, recreational drug use |
| Occupation & Hobbies | Job title, industry, hazardous hobbies |
| Existing Cover | Existing policies, total existing cover amount |

---

## Developer Notes

- **DEV ONLY — Prefill button**: A prefill button is present on the form to populate all fields with valid dummy data for testing. This must be removed before production.
- **In-memory store**: Application data is stored in memory and will be lost on server restart. The store is structured as a repository pattern to allow straightforward migration to a SQL database in future.
- **National Insurance Number**: Currently stored and validated as a UUID-format string for development purposes.
- **PDF generation**: PDFs are generated entirely client-side using jsPDF. No server involvement is required.
- **Joint life policies**: Not in scope for this release.
- **Authentication**: Not in scope for this release. The form is anonymous.

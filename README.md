# Danial: AI Digital Operations System
**Repository:** `aalmanasir/daniel-google-ai-ops`

Danial is a secure, server-side-safe, executive-grade digital operating system designed for **Abdulla** to manage and automate personal, business, and cloud orchestration layers. It unifies operations across Google AI (Gemini), Google Workspace (Gmail, Drive, Contacts), GitHub pipelines, and Google Cloud Platform resources.

---

## Technical Architecture

The system is engineered as a secure **Full-Stack (Vite + Express)** application, prioritizing strict backend containment. Private tokens, API keys, and credential handshakes remain completely hidden from browser context and are proxied via server-side routes:

```
[ FRONTEND SPA: React v19 ]
           │
     (Secure JWT/OAuth API Calls)
           ▼
[ BACKEND SERVICE: Node.js Express ] ── (HSM Secret Manager)
           │
           ├─► Google Gemini Pro / Ultra
           ├─► Google Workspace APIs (People, Gmail, Drive)
           ├─► GitHub OS Engine
           └─► Google Cloud Run Container Infrastructure
```

---

## Core Operations Subsystems

1. **Google AI Engine (Gemini Pro/Ultra)**
   - Utilizes advanced Gemini 1.5 Pro schemas for multimodal retrieval, OCR indexing, content synthesis, and corporate briefings.
   - Initialized strictly on the backend to prevent active browser exposure of the `GEMINI_API_KEY`.

2. **Google Workspace Hub**
   - **Gmail Systems Node**: Scans inboxes, triggers real-time filter indexing, tags critical corporate threads, and drafts summaries.
   - **Drive Storage Node**: Audits directory layouts and tracks file trees across your premium 30 TB storage limits.
   - **People Guard Node**: Meticulously parses contacts, identifies spelling variations, and implements a deep **UAE mobile formatting normalization audit** (`050...` ➜ `+97150...`).

3. **Google Cloud Run Node**
   - Monitors container memory consumption, ingress, and manages Cloud KMS key rotations.

4. **GitHub Platform Bridge**
   - Integrates with repository trees, validates commit states, tracks active issues, and reviews modified files for secret leaks before pushing.

5. **Anthropic / Model Context Protocol (MCP)**
   - Synchronizes agent context maps to allow local agentic commands to query Workspace databases safely using short-lived in-memory credentials.

---

## Security & Human-in-the-Loop Controls

* **Dry-Run Protections**: Toggling **Dry-Run Mode** on the top panel intercepts all mutate/write operations. When active, requests are audited, formatted, and logged without executing destructive changes on your production accounts.
* **Consent Gated Mutations**: No email can be sent, contact merged, or file deleted without manual endorsement from Abdulla.
* **No Frontend Secrets Lineage**: Direct reference to keys inside browser assets is strictly forbidden. All credentials utilize `.env` environment variables.

---

## Environment Variables (`.env.example`)

Set up a local `.env` file at the root using the following schema:

```env
# Google Gemini Integration Key
GEMINI_API_KEY="your_api_key_here"

# Application Deployment Ingress
APP_URL="http://localhost:3000"

# Google Client OAuth Secrets for Workspace Scopes
GOOGLE_CLIENT_ID="your_google_client_id_here"
GOOGLE_CLIENT_SECRET="your_google_client_secret_here"

# GitHub API Security Key
GITHUB_TOKEN="your_github_token_here"

# GCP IAM Credentials Path
GOOGLE_APPLICATION_CREDENTIALS="/path/to/keyfile.json"
```

---

## Workspace API Scopes

This system requests only the minimum permitted scopes to manage indexes:
* `contacts.readonly` / `contacts` — Access and format People profiles.
* `drive.readonly` — Index files for global dashboard queries.
* `gmail.readonly` / `gmail.modify` — Process messages and construct filter tags.

---

## Development & Production Deployment

### Local Setup
Ensure you have Node.js 18+ installed.

1. Install base dependencies:
   ```bash
   npm install
   ```
2. Start the hot-reloading development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` to interact with the executive cockpit.

### Clean & Compilation Build
Compile the frontend SPA and bundle the Express backend into an optimized standalone Node module:
```bash
npm run clean
npm run build
```
Run the production build:
```bash
npm run start
```

### Google Cloud Run Deployment
The system is fully compliant with serverless container platforms. To deploy manually via Google Cloud SDK:
```bash
gcloud run deploy daniel-google-ai-ops \
  --source . \
  --port 3000 \
  --allow-unauthenticated \
  --set-env-vars="NODE_ENV=production"
```
Ensure required IAM Service Account roles (`Secret Manager Secret Accessor`, `Cloud Run Invoker`) are mapped correctly.

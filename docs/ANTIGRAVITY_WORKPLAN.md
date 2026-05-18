# ActionBridge AI - Execution Plan

## 1. System Architecture Blueprints

### Node.js Backend Layout
A modular Express-based backend to orchestrate the AI agents and serve the mobile client.

```text
backend/
├── src/
│   ├── index.js             # Application entry point
│   ├── config/              # Environment variables and configuration (e.g., LLM keys)
│   ├── routes/              # API route definitions
│   ├── controllers/         # Request handling and response formatting
│   ├── services/            # Core business logic and agent orchestrator
│   │   ├── orchestrator.js  # Manages the pipeline of agent execution
│   │   ├── llmProvider.js   # Interface to Gemini/LLM models
│   │   └── simulation.js    # Mock engine for execution outcomes
│   ├── models/              # Data schemas (if using a DB, else type definitions)
│   ├── middlewares/         # Error handlers, logging, validation
│   └── utils/               # Helpers, parsers, and constants
├── package.json
└── .env
```

### Expo React Native Architecture (Fallback-supported)
A clean, cross-platform mobile app structured for resilience and easy fallback rendering.

```text
mobile-app/
├── App.js                   # Application root
├── src/
│   ├── navigation/          # React Navigation stacks and tabs
│   ├── screens/             # Primary views (InputScreen, AnalysisScreen, SimulationScreen)
│   ├── components/          # Reusable UI elements (InputBox, AgentCard, ActionButton)
│   ├── services/            # API client (Axios/fetch wrappers) connecting to Node.js backend
│   ├── hooks/               # Custom hooks for state and data fetching
│   ├── store/               # State management (Context API or Zustand)
│   ├── theme/               # Global styling, colors, and typography (Fallback supported)
│   └── assets/              # Local images, icons, and fonts
├── app.json                 # Expo configuration
├── package.json
└── babel.config.js
```

---

## 2. Agent Roles Checklist
The core pipeline of ActionBridge AI operates through six distinct agent roles.

- [ ] **Input Agent**
  - **Role:** Ingests raw, messy data (e.g., text, reports, complaints).
  - **Task:** Cleans, sanitizes, and standardizes the input into a structured payload for downstream processing.
- [ ] **Insight Agent**
  - **Role:** Analyzes the structured data to uncover hidden patterns and root causes.
  - **Task:** E.g., Correlates "delivery complaints" with "falling satisfaction" to diagnose regional operational bottlenecks.
- [ ] **Impact Agent**
  - **Role:** Evaluates the business or real-world consequence of the insights.
  - **Task:** Quantifies risk or opportunity (e.g., "Critical revenue and user retention risk").
- [ ] **Action Agent**
  - **Role:** Recommends concrete, practical steps to address the impact.
  - **Task:** Formulates strategies (e.g., "Launch Lahore recovery campaign", "Dispatch operations team").
- [ ] **Simulation Agent**
  - **Role:** Mocks the execution of the recommended actions to project outcomes.
  - **Task:** Generates a script or simulated logs of background tasks (e.g., auto-assigning high-priority Jira tickets, sending promotional emails).
- [ ] **Trace Logger Agent**
  - **Role:** Records workplan, task plan, reasoning steps, decision flow, tool/API usage, simulated action logs, and final state change.
  - **Task:** Provides a transparent audit trail of the entire agentic pipeline as required by AISeekho.

---

## 3. MVP API Endpoints
The following REST API endpoints will be explicitly implemented for the MVP:
- `GET /health`
- `GET /scenarios`
- `POST /analyze`
- `POST /simulate-action`

---

## 4. End-to-End Demo Flow
The precise pipeline execution order for the main hackathon demo:
1. Input
2. Facts
3. Insight
4. Impact
5. Recommended Action
6. Simulated Execution
7. Before/After Outcome
8. Agent Logs

---

## 5. Hackathon Requirement Mapping
How ActionBridge AI maps to the core AISeekho challenge requirements:
- **Content Understanding:** Input Agent parsing messy text.
- **Insight Extraction:** Insight Agent identifying root causes.
- **Impact Analysis:** Impact Agent assessing business risk.
- **Action Generation:** Action Agent formulating a concrete strategy.
- **Action Simulation:** Simulation Agent projecting automated task execution.
- **Outcome Visualization:** Mobile frontend rendering the state changes.
- **Agentic Workflow:** Trace Logger Agent verifying autonomous handoffs.

---

## 6. Do Not Build Yet (Out of MVP Scope)
To ensure we finish on time and focus on the core hackathon criteria, we will deliberately avoid building:
- Login / Authentication
- Payment integration
- Real CRM integrations
- Real SMS / Email sending (simulated only)
- Complex databases
- Advanced PDF parsing (we will rely on text input for MVP)
- Maps
- Admin Dashboards

---

## 7. Execution Phases

### Phase 1: Setup & Scaffolding
- Initialize the Node.js backend repository.
- Initialize the Expo React Native app (`mobile-app/`).
- Setup basic routing (backend) and navigation (mobile).

### Phase 2: Backend & Agent Pipeline Construction
- Integrate LLM API (Gemini).
- Build the sequential pipeline: Input -> Insight -> Impact -> Action -> Simulation.
- Implement the MVP API Endpoints.

### Phase 3: Mobile Client Integration
- Build UI screens for data entry and result visualization.
- Connect mobile app to the backend API.
- Implement responsive feedback and error handling (fallbacks).

### Phase 4: Polish & Demo Readiness
- Refine prompts for robust agent outputs based on the main demo scenario.
- Polish UI/UX, add animations, and ensure a premium feel for the hackathon demo.

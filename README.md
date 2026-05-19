# ActionBridge AI — Autonomous Content-to-Action Agent

**Turns messy information into insights, actions, simulations, and outcomes.**

---

## Hackathon Details
**AISeekho 2026 Google Antigravity Hackathon**  
**Selected Challenge:** Challenge 1: Autonomous Content-to-Action Agent

## The Problem
Most AI tools stop at summarization. Real users need more than just a recap of the problem—they need insight, impact assessment, actionable recommendations, and execution.

## The Solution
ActionBridge AI converts unstructured, messy reports, complaints, news, and public updates into a structured, executable intelligence pipeline. It transforms raw text into:
- **Facts**
- **Insight**
- **Impact**
- **Recommended Actions**
- **Simulated Execution**
- **Before/After State**
- **Agent Trace Logs**

---

## Main Demo Scenario
**Input:**
> *"Orders in Lahore dropped by 25% this month. Delivery complaints increased, and customer satisfaction is falling."*

ActionBridge AI processes this input to instantly evaluate the core issue, assess the business risk, recommend a localized recovery campaign, and simulate the creation of Ops tickets and customer retention emails.

---

## Key Features
- **Content Understanding**
- **Insight Extraction**
- **Impact Analysis**
- **Action Recommendation**
- **Simulated Execution**
- **Before/After Outcome**
- **Agent Trace Log**
- **Gemini fallback / demo-safe mode**

## Agent Workflow
ActionBridge AI utilizes a specialized multi-agent pipeline:
1. **Input Understanding Agent**
2. **Insight Extraction Agent**
3. **Impact Analysis Agent**
4. **Action Recommendation Agent**
5. **Simulation Execution Agent**
6. **Trace Logger / Agent Trace**

## Architecture
- **Expo React Native mobile/web app**
- **Node.js Express backend**
- **Gemini API with deterministic fallback mode**
- **JSON structured response**

## API Endpoints
- `GET /health`
- `GET /api/health`
- `POST /api/analyze`

---

## How to Run

### Backend
```bash
cd backend
npm.cmd run dev
```

### Mobile / Web Client
```bash
cd mobile-app
npx.cmd expo start --web
```

---

## Responsible AI & Limitations
- **Simulated execution only.** 
- **No real customer data used.** 
- **Human review required before real-world action.**
- **Fallback responses are deterministic for demo stability.**

## Future Improvements
- **PDF upload**
- **Real CRM integration**
- **Real notification system**
- **Dashboard persistence**
- **Additional domains**

---

## How Google Antigravity Was Used

Google Antigravity was used as the core development and orchestration workspace for:

- reading PROJECT_BRIEF.md as source of truth
- creating the execution workplan
- designing the multi-agent workflow
- scaffolding the Node.js backend
- building the Expo React Native mobile/web app
- debugging backend startup errors
- fixing Gemini quota fallback mode
- improving frontend/backend integration
- generating Antigravity evidence logs
- preparing the final demo trace

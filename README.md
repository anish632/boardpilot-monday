# BoardPilot — AI Project Health for monday.com

A monday.com Sidekick Skills app that analyzes board health using AI.

## Tools

- **Analyze Board** — `POST /api/tools/analyze-board` — Health score + AI summary
- **Find Risks** — `POST /api/tools/find-risks` — Overdue, stuck, unassigned, stale items
- **Status Report** — `POST /api/tools/status-report` — Stakeholder-ready report

## Setup

```bash
npm install
npm run dev
```

## Stack

Next.js 14, TypeScript, Tailwind CSS, Groq (Llama 3.3 70B)
